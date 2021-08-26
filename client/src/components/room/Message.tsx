import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { Message as IMessage } from "../../models/Room";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { StayPrimaryPortraitTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	message: {
		width: "600px",
		maxWidth: "max-content",
		wordWrap: "break-word",
		margin: theme.spacing(2, 0),
		padding: theme.spacing(1, 2.5),
		borderRadius: "30px",
		color: "#ffffff",
		clear: "both",
		["@media (max-width: 768px)"]: {
			width: "calc(100vw - 165px)",
		},
	},
	toMessage: {
		float: "right",
		backgroundColor: "#28992E",
	},
	fromMessage: {
		backgroundColor: "#727274",
	},
	defaultMessage: {
		backgroundColor: "blue",
	},
	left: {},
	joined: {},
}));

interface Props {
	message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
	const classes = useStyles();
	const { authState } = useAuth();
	const { sender, value, is_default } = message;

	const [recipient, setRecipient] = useState(false);

	useEffect(() => {
		const { username } = authState.user;
		setRecipient(username !== sender);
	}, []);

	const formatMessage = () => {
		let string = "";
		string += is_default
			? classes.defaultMessage && value === "left"
				? classes.left
				: classes.joined
			: recipient
			? classes.fromMessage
			: classes.toMessage;
		console.log(is_default);
		return string;
		//return recipient ? classes.fromMessage : classes.toMessage;
	};

	const formatSender = () => {
		return recipient ? sender : "You";
	};

	return (
		<Box className={`${classes.message} ${formatMessage()}`}>
			<Typography variant="subtitle2" style={{ color: "#e1e1e1" }}>
				{formatSender()}
			</Typography>
			<Typography variant="body1">{value}</Typography>
		</Box>
	);
};

export default Message;
