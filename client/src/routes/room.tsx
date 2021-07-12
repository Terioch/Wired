import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../config/socket";
import Components from "../components/Components";
import Client from "../api/Client";
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

const Room: React.FC = () => {
	const classes = useStyles();
	const location = useLocation();
	const { authState } = useAuth();

	const [room, setRoom] = useState({});
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{
			id: 1,
			sender: "Terioch",
			value: "Hello, Friends",
		},
		{
			id: 2,
			sender: "Kasparov",
			value: "We are here",
		},
		{
			id: 3,
			sender: "Federer",
			value: "Good Morning",
		},
	]);

	useEffect(() => {
		fetchRoomData();
	}, []);

	// Fetch data for the current room
	const fetchRoomData = async () => {
		const pathnames = location.pathname.split("/");
		const slug = pathnames[pathnames.length - 1];
		const response = await Client.rooms.findOne(slug);
		console.log(location.state);
	};

	const handleInputChange = (e: ChangeE) => {
		const { value } = e.target;
		setMessage(value);
	};

	// Send a new message
	const handleSubmit = (e: FormE) => {
		e.preventDefault();
		setMessage("");
	};

	return (
		<form className={classes.main} onSubmit={handleSubmit}>
			<Paper className={classes.paper} elevation={3}>
				<section className={classes.title}>
					<Typography variant="h5" color="secondary" gutterBottom>
						Room 101
					</Typography>
				</section>
				<Divider light />
				<section className={classes.messagesContainer}>
					{messages.map(message => (
						<Message key={message.id} message={message} />
					))}
				</section>
				<section className={classes.inputContainer}>
					<TextField
						className={classes.input}
						label="Your message..."
						color="secondary"
						value={message}
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
