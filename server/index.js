require("dotenv").config();

const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const bcrypt = require("bcrypt");
const session = require("express-session");

const db = require("./config/db");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["tk_token"],
		credentials: true,
	},
});

app.set("trust proxy", 1); // Trust first proxy

// Parse middleware and serve files
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: true,
			maxAge: parseInt(process.env.SESSION_MAX_AGE),
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

// Handle requests for users table

// Insert a new user into database
const insertUser = async (username, password) => {
	const query =
		"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, password";
	const hashedPassword = await bcrypt.hash(password, 10);
	const result = await db.query(query, [username, hashedPassword]);
	return result.rows[0];
};

// Check if login details are valid by comparing encrypted passwords
const authenticatePassword = async (password, user) => {
	try {
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) return user;
		return { password: "Password is incorrect" };
	} catch (err) {
		console.error(`Login error: ${err.message}`);
		throw err;
	}
};

// Query database for a specific username
const searchUsername = async username => {
	const query = "SELECT * FROM users WHERE username = $1";
	return await db.query(query, [username]);
};

// Register a new user
app.post("/api/users/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await searchUsername(username);
		console.log(result.rows);

		// Check if username is found
		if (result.rows.length > 0) {
			return res.status(200).send({
				username:
					"Username is already in use. Either login or try a different username.",
			});
		}

		// Insert a new user
		const user = await insertUser(username, password);
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
		const result = await searchUsername(username);

		// Check if username is found
		if (result.rows.length < 1) {
			return res.status(200).send({ username: "Username is incorrect" });
		}

		// Compare passwords
		const user = await authenticatePassword(password, result.rows[0]);
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

server.listen(PORT, () =>
	console.log(`Server is listening on port ${PORT}`)
);
