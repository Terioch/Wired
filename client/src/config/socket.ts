import { server } from "./server";
const io = require("socket.io-client");

export const socket = io.connect(server);
