require("dotenv").config();
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const db = require("./config");

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

app.get("/api", (req, res) =>
	res.send("Head to the '/api' endpoint to view api responses...")
);
app.get("/api", (req, res) =>
	res.send(
		"Starting route for api requests. Navigate to '/users' or '/messages' to view direct responses..."
	)
);

// Handle requests for users table
app.post("/api/users", async (req, res) => {
	try {
		const { username, password } = req.body;
		const query =
			"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
		const result = await db.query(query, [username, password]);
		console.log(result);
		return res.status(200).send("Inserted a new user");
	} catch (err) {
		console.error(`POST ${err.message}`);
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
