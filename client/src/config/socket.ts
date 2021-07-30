import { SERVER_URL } from "./server";
const io = require("socket.io-client");

export const socket = io.connect(SERVER_URL);
