require("dotenv").config();

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
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

// Middleware
app.use(express.json());
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(flash());

app.get("/api", (req, res) =>
	res.send("Head to the '/api' endpoint to view api responses...")
);
app.get("/api", (req, res) =>
	res.send(
		"Starting route for api requests. Navigate to '/users' or '/messages' to view direct responses..."
	)
);

// Handle requests for users table

const insertUser = async (username, password) => {
	const query =
		"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, password";
	const hashedPassword = await bcrypt.hash(password, 10);
	const result = await db.query(query, [username, hashedPassword]);
	return result.rows[0];
};

// Add a new user
app.post("/api/users", async (req, res) => {
	try {
		const { username, password } = req.body;
		const query = "SELECT * FROM users WHERE username = $1";
		const result = await db.query(query, [username]);

		// Attempt to login user if found in database
		if (result.rows.length > 0) {
			return res.status(200).send("Please login");
		}
		// Register a new user
		const user = await insertUser(username, password);
		return res.status(200).send(user);
	} catch (err) {
		console.error(`POST ${err.message}`);
		return res.status(500);
	}
});

// Handle requests for messages table
app.get("/api/messages", async (req, res) => {
	return res.status(200).send("Hello from express");
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
