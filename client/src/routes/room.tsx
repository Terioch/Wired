import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../config/socket";
import Components from "../components/Components";
import Client from "../api/Client";
import { Room as IRoom } from "../models/Room";
import { Message as IMessage } from "../models/Message";
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
import { useEffect } from "react";

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
		admin: "",
		members: [],
	});
	const [value, setValue] = useState("");
	const [messages, setMessages] = useState([
		{
			sender: "Terioch",
			value: "Hello, Friends",
			roomId: 1,
		},
		{
			sender: "Kasparov",
			value: "We are here",
			roomId: 2,
		},
		{
			sender: "Federer",
			value: "Good Morning",
			roomId: 3,
		},
	]);

	// Fetch data for the current room
	useEffect(() => {
		const { room } = location.state;
		setRoom(room);
		console.log(room);
	}, []);

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
			roomId: room.id,
		};

		// Emit message via socket signal
		socket.emit("message", message);
		socket.on("message", (message: IMessage) => {
			console.log(message);
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
					{messages.map(message => (
						<Message key={message.roomId} message={message} />
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
