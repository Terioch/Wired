import React, { useState } from "react";
import { socket } from "../config/socket";
import Components from "../components/Components";
import { ChangeE } from "../models/Events";
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

const Room: React.FC = () => {
	const classes = useStyles();

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

	const handleMessage = (e: ChangeE) => {
		const { value } = e.target;
		setMessage(value);
	};

	return (
		<main className={classes.main}>
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
						onChange={handleMessage}
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
		</main>
	);
};

export default Room;
