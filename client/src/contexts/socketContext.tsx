import React, {
	useState,
	useEffect,
	useContext,
	createContext,
} from "react";
import { SERVER_URL } from "../config/server";
const io = require("socket.io-client");

interface ISocketContext {
	socket: any;
}

const SocketContext = createContext({} as ISocketContext);

export const SocketProvider: React.FC = ({ children }) => {
	const [socket, setSocket] = useState();

	useEffect(() => {
		const newSocket = io.connect(SERVER_URL);
		setSocket(newSocket);
		console.log("Set new socket");
		return () => newSocket.close(); // Close previous connection when useEffect runs again
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocket = () => useContext(SocketContext);
