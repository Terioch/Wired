import React, {
	useState,
	useEffect,
	useContext,
	createContext,
} from "react";
import { useLocation, useHistory } from "react-router-dom";
import Client from "../api/Client";
import { Room as IRoom, Message as IMessage } from "../models/Room";
import { useAuth } from "./authContext";
import { useAuthAxios } from "../contexts/fetchContext";
import { useSocket } from "./socketContext";

interface State {
	room: IRoom;
}

interface Location {
	pathname: string;
	state: State;
}

const RoomContext = createContext({} as any);

export const RoomProvider: React.FC = ({ children }) => {
	const location: Location = useLocation();
	const history = useHistory();
	const { socket } = useSocket();
	const { authState } = useAuth();
	const { authAxios } = useAuthAxios();

	const [room, setRoom] = useState<IRoom>({
		id: -1,
		name: "",
		slug: "",
		admin: "",
		members: [],
		messages: [],
	});

	useEffect(() => {
		location.state ? fetchRoomFromLocation() : fetchRoomFromServer();
	}, []);

	useEffect(() => {
		// Indicate to server that a room has been entered
		const { username } = authState.user;
		if (socket) socket.emit("entered-room", username);
	}, [socket]);

	useEffect(() => {
		if (!socket) return;
		socket.on("receive-message", (message: IMessage) => {
			addNewMessage(message);
		});
		return () => socket.off("receive-message"); // Close socket connection to prevent excessive re-runs
	}, [room.messages]);

	// Fetch room data from location state within route
	const fetchRoomFromLocation = () => {
		const { room } = location.state;
		setRoom(room);
	};

	// Fetch room data from the server when location state is undefined
	const fetchRoomFromServer = async () => {
		try {
			const pathnameParts = location.pathname.split("/");
			const slug = pathnameParts[pathnameParts.length - 1];
			const { info, messages } = await Client.rooms.findOne(
				authAxios,
				slug
			);
			setRoom({ ...info, messages });
		} catch (err: any) {
			console.error(err.message);
			history.push("/dashboard");
		}
	};

	// Add new message to the current room
	const addNewMessage = (message: IMessage) => {
		setRoom({
			...room,
			messages: [...room.messages, message],
		});
	};

	// Remove a user as a room member or close the room if they're admin
	const handleLeaveRequest = () => {
		const { username } = authState.user;
		if (username === room.admin) {
			socket.emit("close-room", room.id);
			history.push("/dashboard");
		} else {
			const message = {
				sender: username,
				value: `${username} left`,
				room_id: room.id,
				is_default: true,
			};
			socket.emit("leave-room", username, room.id);
			socket.emit("send-message", message, room.members);
		}
		history.push("/dashboard");
	};

	return (
		<RoomContext.Provider value={{ room, handleLeaveRequest }}>
			{children}
		</RoomContext.Provider>
	);
};

export const useRoom = () => useContext(RoomContext);
