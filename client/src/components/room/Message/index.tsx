import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import { Message as IMessage } from "../../../models/Room";
import { Typography, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	message: {
		width: "600px",
		maxWidth: "max-content",
		wordWrap: "break-word",
		margin: theme.spacing(1, 0),
		padding: theme.spacing(1, 2.5),
		borderRadius: "30px",
		color: "#ffffff",
		clear: "both",
		["@media (max-width: 768px)"]: {
			width: "calc(100vw - 165px)",
		},
	},
	defaultMessage: {
		width: "100%",
		float: "left",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: theme.spacing(1, 0),
		padding: theme.spacing(1, 0),
		borderRadius: "10px",
		"& > *": {
			margin: theme.spacing(0, 0.25),
		},
	},
	to: {
		float: "right",
		backgroundColor: "#28992E",
		"& > *:first-child": {
			color: "#e3e3e3",
		},
	},
	from: {
		float: "left",
		backgroundColor: "#E9E9E9",
		"& > *:first-child": {
			color: "#A1A1A1",
		},
		"& > *:last-child": {
			color: "#000000",
		},
	},
	left: {
		backgroundColor: "#E12323",
	},
	joined: {
		backgroundColor: "#1976D2",
	},
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

	const formatMessageState = () => {
		return is_default ? classes.defaultMessage : classes.message;
	};

	const formatMessageType = () => {
		return is_default
			? value.split(" ")[1] === "joined"
				? classes.joined
				: classes.left
			: recipient
			? classes.from
			: classes.to;
	};

	const formatSenderText = () => {
		return recipient ? sender : "You";
	};

	const formatValueText = () => {
		return recipient ? value : `You ${value.split(" ")[1]}`;
	};

	return (
		<Box className={`${formatMessageState()} ${formatMessageType()}`}>
			{is_default ? (
				<Typography variant="body1" style={{ color: "#e1e1e1" }}>
					{formatValueText()}
				</Typography>
			) : (
				<>
					<Typography variant="subtitle2">{formatSenderText()}</Typography>
					<Typography variant="body1">{value}</Typography>
				</>
			)}
		</Box>
	);
};

export default Message;
