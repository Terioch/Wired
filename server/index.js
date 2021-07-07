require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const jwtDecode = require("jwt-decode");
const cookieParser = require("cookie-parser");

const users = require("./api/users");
const rooms = require("./api/rooms");

const { PORT, JWT_SECRET, JWT_MAX_AGE } = process.env;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["tk_token"],
		credentials: true,
	},
});

// Parse middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5000",
		methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
		credentials: true,
	})
);

app.get("/api", (req, res) => {
	res.send("Head to the '/api' endpoint to view api responses...");
});
app.get("/api", (req, res) => {
	res.send(
		"Starting route for api requests. Navigate to '/users' or '/messages' to view direct responses..."
	);
});

// Verify user authentication status on the current session
const requireAuth = (req, res, next) => {
	const { user } = req.session;
	if (!user) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	next();
};

// Handle requests for users table

// Register a new user
app.post("/api/users/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await users.findOne(username);

		// Check if username is found
		if (result.rows.length > 0) {
			return res.status(200).json({
				username:
					"Username already exists. Either login or try a different username.",
			});
		}

		// Insert a new user then send both the token and user
		const user = await users.insertOne(username, password);
		const token = users.createToken(user);
		const decodedToken = jwtDecode(token);
		const expiresAt = decodedToken.exp;

		// Send token as a cookie
		res.cookie("token", token, {
			httpOnly: true,
		});

		return res.status(200).json({
			token,
			expiresAt,
			user,
		});
	} catch (err) {
		console.error(`POST ${err.message}`);
		return res.status(500);
	}
});

// Login an existing user
app.post("/api/users/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await users.findOne(username);

		// Check if username is found
		if (result.rows.length < 1) {
			return res.status(200).json({ username: "Username is incorrect" });
		}

		// Compare passwords and set session id if password is correct
		const user = await users.verifyPassword(password, result.rows[0]);

		if (!user) {
			return res.status(200).json({ password: "Password is incorrect" });
		}

		// Send both token and user
		const token = users.createToken(user);
		const decodedToken = jwtDecode(token);
		const expiresAt = decodedToken.exp;

		res.cookie("token", token, {
			httpOnly: true,
		});

		return res.status(200).json({
			token,
			expiresAt,
			user,
		});
	} catch (err) {
		console.error(`POST ${err.message}`);
		return res.status(500);
	}
});

// Handle requests for rooms table

app.post("/api/rooms/:id", async (req, res) => {
	// TODO: Store new room info in rooms table
	try {
	} catch (err) {
		console.error(`Rooms POST: ${err.message}`);
	}
});

// Handle requests for messages table

app.get("/api/messages", async (req, res) => {
	return res.status(200).send("Hello from the messages endpoint...");
});

// Listen for a new web socket connection
io.on("connection", socket => {
	console.log("Initialized a new web socket connection...");
	socket.on("message", message => {
		console.log(message);
		socket.emit("message", message);
	});

	// New room was created
	socket.on("new-room", async data => {
		try {
			const { name, admin } = data;
			const result = await rooms.findOne(name);

			if (result.rows.length > 0) {
				return res.status(200).send("Room name already exists");
			}

			const room = await rooms.insertOne(name, admin);
			return res.status(200).json(room);
		} catch (err) {
			console.error(`new-room: ${err.message}`);
		}
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
