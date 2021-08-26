import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Components from "../components/Components";
import CommonComponents from "../components/common/CommonComponents";
import { Message as IMessage } from "../models/Room";
import { ChangeE, FormE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
import { useSocket } from "../contexts/socketContext";
import { useScreenSize } from "../contexts/screenSizeContext";
import { useRoom } from "../contexts/roomContext";
import {
	Typography,
	Paper,
	TextField,
	InputAdornment,
	Button,
	makeStyles,
} from "@material-ui/core";
import { Send, ArrowBackRounded } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	main: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(2.5),
	},
	paper: {
		height: "94.95vh",
		width: "700px",
		maxWidth: "100%",
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(0, 1.5),
		backgroundColor: "#eeeeee",
		overflow: "auto",
	},
	header: {
		position: "sticky",
		top: "0",
		display: "grid",
		alignItems: "center",
		padding: theme.spacing(1),
		borderBottom: "1px solid #dddddd",
		backgroundColor: "#eeeeee",
		"& > *": {
			gridColumnStart: "1",
			gridRowStart: "1",
			justifySelf: "center",
		},
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(1, 0),
		},
	},
	title: {},
	arrowBack: {
		justifySelf: "left",
		borderRadius: "25px",
		cursor: "pointer",
		padding: theme.spacing(0.5),
		"&:hover": {
			backgroundColor: "#dddddd",
		},
	},
	messagesContainer: {
		flex: 1,
	},
	footer: {
		position: "sticky",
		bottom: "0",
		display: "grid",
		padding: theme.spacing(1),
		marginTop: theme.spacing(1),
		backgroundColor: "#eeeeee",
		"& > *": {
			gridColumnStart: "1",
			gridRowStart: "1",
			justifySelf: "center",
		},
	},
	input: {
		[theme.breakpoints.down("sm")]: {
			justifySelf: "left",
		},
	},
	leaveBtn: {
		alignSelf: "flex-end",
		justifySelf: "right",
		backgroundColor: "#E12323",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "#E12323",
		},
	},
}));

const Room: React.FC = () => {
	const { Message, DottedMenu } = Components;
	const { Spinner, ScrollToBottom } = CommonComponents;

	const classes = useStyles();
	const history = useHistory();
	const { authState } = useAuth();
	const { socket } = useSocket();
	const { screenWidth } = useScreenSize();
	const { room, handleLeaveRequest } = useRoom();

	const [value, setValue] = useState("");

	const handleRouting = (path: string) => history.push(path);

	const handleInputChange = (e: ChangeE) => {
		const { value } = e.target;
		setValue(value);
	};

	// Verifies whether the user is a member of the current room
	const isRoomMember = () => {
		const { username } = authState.user;
		if (room.admin === username || room.id < 0) return true;
		return room.members.filter((member: string) => member === username)
			.length;
	};

	const getLeaveRoomText = () => {
		const { username } = authState.user;
		return username === room.admin ? "Close Room" : "Leave Room";
	};

	// Send a new message
	const handleMessageSubmit = async (e: FormE) => {
		e.preventDefault();
		const message = {
			sender: authState.user.username,
			value,
			room_id: room.id,
			is_default: false,
		};

		// Emit and push the message
		socket.emit("send-message", message, room.members);
		setValue("");
	};

	return room.id < 0 ? (
		<div style={{ height: "100vh" }}>
			<Spinner color="#4976D2" />
		</div>
	) : !isRoomMember() ? (
		<Redirect to="/dashboard" />
	) : (
		<>
			<form className={classes.main} onSubmit={handleMessageSubmit}>
				<Paper className={classes.paper} elevation={3}>
					<header className={classes.header}>
						<ArrowBackRounded
							className={classes.arrowBack}
							onClick={() => handleRouting("/dashboard")}
						/>
						<Typography
							className={classes.title}
							variant={screenWidth < 568 ? "h6" : "h5"}
							color="secondary"
						>
							{room.name}
						</Typography>
						{screenWidth < 568 && (
							<DottedMenu
								getLeaveRoomText={getLeaveRoomText}
								handleLeaveRequest={handleLeaveRequest}
							/>
						)}
					</header>
					<section className={classes.messagesContainer}>
						{room.messages.map((message: IMessage) => (
							<Message key={message.id} message={message} />
						))}
					</section>
					<footer className={classes.footer}>
						<TextField
							className={classes.input}
							label="Your message..."
							color="secondary"
							value={value}
							onChange={handleInputChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<Send />
									</InputAdornment>
								),
							}}
						/>
						{screenWidth > 568 && (
							<Button
								className={classes.leaveBtn}
								variant="contained"
								size={screenWidth < 568 ? "small" : "medium"}
								onClick={handleLeaveRequest}
							>
								{getLeaveRoomText()}
							</Button>
						)}
					</footer>
					<ScrollToBottom dependencies={room.messages} />
				</Paper>
			</form>
		</>
	);
};

export default Room;
