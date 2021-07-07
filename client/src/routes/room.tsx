import React, { useState } from "react";
import { socket } from "../config/socket";
import {
	Typography,
	Paper,
	TextField,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	main: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(2.5),
	},
	paper: {
		width: "700px",
		padding: theme.spacing(1.5),
	},
}));

type ChangeE = React.ChangeEvent<HTMLInputElement>;

const Room: React.FC = () => {
	const classes = useStyles();

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{
			id: 1,
			name: "Terioch",
			value: "Hello, Friends",
		},
		{
			id: 2,
			name: "Kasparov",
			value: "We are here",
		},
		{
			id: 3,
			name: "Federer",
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
				{messages.map(message => (
					<div>
						<Typography variant="subtitle1">{message.name}</Typography>
						<Typography variant="body1">{message.value}</Typography>
					</div>
				))}
				<TextField
					label="Your message..."
					color="secondary"
					value={message}
					onChange={handleMessage}
				/>
			</Paper>
		</main>
	);
};

export default Room;
