require("dotenv").config();
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const db = require("./config");

db.connect(); // Initialize database connection

// client.query(
// 	"INSERT INTO users (username, password) VALUES ('good day', '1111');"
// );

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

app.use(express.json()); // Parse middleware

// Handle requests for users table
app.post("/api/users", (req, res) => {
	const { username, password } = req.body;
	const query = "INSERT INTO users (username, password) VALUES (?, ?)";
	const result = db.query(query, { username, password });
	console.log(result);
	return res.status(200).send("Inserted a new user");
});

// Handle requests for messages table
app.get("/api/messages", (req, res) => {
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
