require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const jwtDecode = require("jwt-decode");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

const Server = require("./api/Server");

const PORT = process.env.PORT || 5000;

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

// Define middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "https://wired-server.herokuapp.com",
		methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
		credentials: true,
	})
);

app.get("/", (req, res) => {
	res.send("Welcome to the primary server of Wired.");
});
app.get("/api", (req, res) => {
	res.send(
		"Starting route for api requests. Navigate to /users, /rooms or /messages to view direct responses..."
	);
});

// Handle requests for users table

// Register a new user
app.post("/api/users/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await Server.users.findOne(username);

		// Check if username is found
		if (result.rows.length > 0) {
			return res.status(200).json({
				username:
					"Username already exists. Either login or try a different username.",
			});
		}

		// Insert a new user then send both the token and user
		const user = await Server.users.insertOne(username, password);
		const token = Server.users.createToken(user);
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
		const result = await Server.users.findOne(username);

		// Check if username is found
		if (result.rows.length < 1) {
			return res.status(200).json({ username: "Username is incorrect" });
		}

		// Compare passwords and set session id if password is correct
		const user = await Server.users.verifyPassword(
			password,
			result.rows[0]
		);

		if (!user) {
			return res.status(200).json({ password: "Password is incorrect" });
		}

		// Send both token and user
		const token = Server.users.createToken(user);
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

// Verify JWT
const checkJwt = jwt({
	secret: process.env.REACT_APP_JWT_SECRET,
	issuer: "api.wired",
	audience: "api.wired",
	algorithms: ["HS256"],
});

app.get("/api/rooms", async (req, res) => {
	try {
		const rooms = await Server.rooms.findAll();
		return res.status(200).json(rooms);
	} catch (err) {
		console.error(`rooms: ${err.message}`);
	}
});

app.post("/api/room/:slug", async (req, res) => {
	try {
		const { slug } = req.body;
		const info = await Server.rooms.findOne(slug);

		if (!info) {
			return res.status(404).json({ error: "Room does not exist" });
		}

		const messages = await Server.messages.findAllByRoom(info.id);
		return res.status(200).json({ info, messages });
	} catch (err) {
		console.error(`one-room: ${err.message}`);
	}
});

// Handle web socket signals
io.on("connection", socket => {
	console.log("Initialized a new web socket connection...");

	// Create a new room
	socket.on("new-room", async data => {
		try {
			const { name, slug, admin } = data;
			const result = await Server.rooms.findOne(slug);

			if (result) {
				return socket.emit("new-room-error", "Room name already exists");
			}

			const room = await Server.rooms.insertOne(name, slug, admin);
			room.messages = [];
			return socket.emit("new-room", room);
		} catch (err) {
			console.error(`new-room: ${err.message}`);
		}
	});

	// New user joined a room
	socket.on("joined-room", async (username, room_id) => {
		try {
			const result = await Server.rooms.insertMember(username, room_id);
			return socket.emit("joined-room", result);
		} catch (err) {
			console.error(`joined-room: ${err.message}`);
		}
	});

	// Receive a new message
	socket.on("send-message", async message => {
		try {
			const result = await Server.messages.insertOne(message);
			return socket.emit("receive-message", result);
		} catch (err) {
			console.error(`send-message: ${err.message}`);
		}
	});

	// Leave the current room
	socket.on("left-room", async (username, room_id) => {
		try {
			return await Server.rooms.deleteMember(username, room_id);
		} catch (err) {
			console.error(`left-room: ${err.message}`);
		}
	});

	// Close the current room
	socket.on("closed-room", async room_id => {
		try {
			return await Server.rooms.deleteOne(room_id);
		} catch (err) {
			console.error(`closed-room: ${err.message}`);
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
