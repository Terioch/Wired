const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

io.on("connection", socket => {
  console.log("Initialized a new web socket connection...");
  socket.on("message", (message) => {
    console.log(message);
  });
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));