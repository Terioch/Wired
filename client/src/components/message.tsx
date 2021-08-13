import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { Message as IMessage } from "../models/Room";
import { Typography, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	message: {
		width: "max-content",
		margin: theme.spacing(2, 0),
		padding: theme.spacing(1, 2.5),
		borderRadius: "50px",
		color: "#ffffff",
		clear: "both",
	},
	toMessage: {
		float: "right",
		backgroundColor: "#28992E",
	},
	fromMessage: {
		backgroundColor: "#727274",
	},
	messageValue: {
		width: "auto",
		wordWrap: "break-word",
	},
}));

interface Props {
	message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
	const classes = useStyles();
	const { authState } = useAuth();
	const { sender, value } = message;

	const [recipient, setRecipient] = useState(false);

	useEffect(() => {
		const { username } = authState.user;
		setRecipient(username !== sender);
	}, []);

	const formatMessage = () => {
		return recipient ? classes.fromMessage : classes.toMessage;
	};

	const formatSender = () => {
		return recipient ? sender : "You";
	};

	return (
		<Box className={`${classes.message} ${formatMessage()}`}>
			<Typography variant="subtitle2" style={{ color: "#e7e7e7" }}>
				{formatSender()}
			</Typography>
			<Typography className={classes.messageValue} variant="body1">
				{value}
			</Typography>
		</Box>
	);
};

export default Message;
