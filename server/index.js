require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const session = require("express-session");

const users = require("./api/users");

const { PORT, SESSION_SECRET, SESSION_MAX_AGE } = process.env;

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
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: false,
			secure: true,
			maxAge: parseInt(SESSION_MAX_AGE),
			sameSite: true,
		},
	})
);
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
		const result = await users.searchUsername(username);

		// Check if username is found
		if (result.rows.length > 0) {
			return res.status(200).send({
				username:
					"Username is already in use. Either login or try a different username.",
			});
		}

		// Insert a new user and set session id
		const user = await users.insertUser(username, password);
		req.session.user = user;
		return res.status(200).send(user);
	} catch (err) {
		console.error(`POST ${err.message}`);
		return res.status(500);
	}
});

// Login an existing user
app.post("/api/users/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await users.searchUsername(username);

		// Check if username is found
		if (result.rows.length < 1) {
			return res.status(200).send({ username: "Username is incorrect" });
		}

		// Compare passwords and set session id
		const user = await users.authenticatePassword(
			password,
			result.rows[0]
		);
		req.session.user = user;
		console.log(req.session.userId);
		return res.status(200).send(user);
	} catch (err) {
		console.error(`POST ${err.message}`);
		return res.status(500);
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
});

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
