import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../config/socket";
import Components from "../components/Components";
import Client from "../api/Client";
import { Room as IRoom, Message as IMessage } from "../models/Room";
import { ChangeE, FormE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
import {
	Typography,
	Paper,
	TextField,
	InputAdornment,
	Divider,
	makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const { Message } = Components;

const useStyles = makeStyles(theme => ({
	main: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(2.5),
	},
	paper: {
		height: "91.8vh",
		width: "700px",
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(1.5),
		backgroundColor: "#eeeeee",
	},
	title: {
		textAlign: "center",
	},
	messagesContainer: {
		flex: 1,
	},
	inputContainer: {
		textAlign: "center",
	},
	input: {},
}));

interface State {
	room: IRoom;
}

interface Location {
	pathname: string;
	state: State;
}

const Room: React.FC = () => {
	const classes = useStyles();
	const location: Location = useLocation();
	const { authState } = useAuth();

	const [room, setRoom] = useState<IRoom>({
		id: -1,
		name: "",
		slug: "",
		admin: "",
		members: [],
		messages: [],
	});
	const [value, setValue] = useState("");

	// Fetch data for the current room
	useEffect(() => {
		location.state ? fetchRoomFromLocation() : fetchRoomFromServer();
	}, []);

	// Fetch room data from location state within route
	const fetchRoomFromLocation = () => {
		const { room } = location.state;
		setRoom(room);
	};

	// Fetch room data from the server when location state is undefined
	const fetchRoomFromServer = async () => {
		const pathnameParts = location.pathname.split("/");
		const slug = pathnameParts[pathnameParts.length - 1];
		const { info, messages } = await Client.rooms.findOne(slug);
		setRoom({ ...info, messages });
	};

	const handleInputChange = (e: ChangeE) => {
		const { value } = e.target;
		setValue(value);
	};

	// Send a new message
	const handleSubmit = async (e: FormE) => {
		e.preventDefault();
		const message = {
			sender: authState.user.username,
			value: value,
			room_id: room.id,
		};

		// Emit message via socket signal
		socket.emit("send-message", message);
		socket.on("return-message", (message: IMessage) => {
			const messages = [...room.messages];
			messages.push(message);
			setRoom({ ...room, messages });
		});
		setValue("");
	};

	return (
		<form className={classes.main} onSubmit={handleSubmit}>
			<Paper className={classes.paper} elevation={3}>
				<section className={classes.title}>
					<Typography variant="h5" color="secondary" gutterBottom>
						{room.name}
					</Typography>
				</section>
				<Divider light />
				<section className={classes.messagesContainer}>
					{room.messages.map(message => (
						<Message key={message.id} message={message} />
					))}
				</section>
				<section className={classes.inputContainer}>
					<TextField
						className={classes.input}
						label="Your message..."
						color="secondary"
						value={value}
						onChange={handleInputChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SendIcon />
								</InputAdornment>
							),
						}}
					/>
				</section>
			</Paper>
		</form>
	);
};

export default Room;
