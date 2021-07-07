import React from "react";
import { useAuth } from "../contexts/authContext";
import { Message as IMessage } from "../models/Message";
import { Typography, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container: {
		margin: theme.spacing(3, 0),
		padding: theme.spacing(1, 2.5),
		borderRadius: "50px",
		color: "#ffffff",
	},
	toContainer: {
		backgroundColor: "#28992E",
	},
	fromContainer: {
		backgroundColor: "grey",
	},
}));

interface Props {
	message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
	const classes = useStyles();
	const { authState } = useAuth();
	const { sender, value } = message;

	const recipient = authState.user.username !== sender;

	return (
		<Box
			className={`${classes.container} ${
				recipient ? classes.fromContainer : classes.toContainer
			}`}
			color="primary"
		>
			<Typography variant="subtitle2">{sender}</Typography>
			<Typography variant="body1">{value}</Typography>
		</Box>
	);
};

export default Message;
