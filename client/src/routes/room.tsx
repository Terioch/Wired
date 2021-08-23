import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
// import { socket } from "../config/socket";
import Components from "../components/Components";
import CommonComponents from "../components/common/CommonComponents";
import Client from "../api/Client";
import { Room as IRoom, Message as IMessage } from "../models/Room";
import { ChangeE, FormE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
import { useAuthAxios } from "../contexts/fetchContext";
import { useSocket } from "../contexts/socketContext";
import { useScreenSize } from "../contexts/screenSizeContext";
import {
	Typography,
	Paper,
	TextField,
	InputAdornment,
	Divider,
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
		minHeight: "91.8vh",
		width: "700px",
		maxWidth: "100%",
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(1.5),
		backgroundColor: "#eeeeee",
	},
	header: {
		display: "grid",
		padding: theme.spacing(0, 1),
		"& > *": {
			gridColumnStart: "1",
			gridRowStart: "1",
			justifySelf: "center",
			// alignSelf: "center",
		},
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(0),
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
		display: "grid",
		padding: theme.spacing(0, 1),
		marginTop: theme.spacing(1),
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
		backgroundColor: "#FC0000",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "#FC0000",
		},
	},
}));

interface State {
	room: IRoom;
}

interface Location {
	pathname: string;
	state: State;
}

const Room: React.FC = () => {
	const { Message, DottedMenu } = Components;
	const { Spinner } = CommonComponents;

	const classes = useStyles();
	const location: Location = useLocation();
	const history = useHistory();
	const { authState } = useAuth();
	const { authAxios } = useAuthAxios();
	const { socket } = useSocket();
	const { screenWidth } = useScreenSize();

	const [room, setRoom] = useState<IRoom>({
		id: -1,
		name: "",
		slug: "",
		admin: "",
		members: [],
		messages: [],
	});
	const [value, setValue] = useState("");

	useEffect(() => {
		location.state ? fetchRoomFromLocation() : fetchRoomFromServer();
	}, []);

	useEffect(() => {
		// Indicate to server that a room has been entered
		socket && socket.emit("entered-room", authState.user.username);
	}, [socket]);

	const handleRouting = (path: string) => history.push(path);

	const handleInputChange = (e: ChangeE) => {
		const { value } = e.target;
		setValue(value);
	};

	// Fetch room data from location state within route
	const fetchRoomFromLocation = () => {
		const { room } = location.state;
		setRoom(room);
	};

	// Fetch room data from the server when location state is undefined
	const fetchRoomFromServer = async () => {
		try {
			const pathnameParts = location.pathname.split("/");
			const slug = pathnameParts[pathnameParts.length - 1];
			const { info, messages } = await Client.rooms.findOne(
				authAxios,
				slug
			);
			setRoom({ ...info, messages });
		} catch (err) {
			console.error(err.message);
			history.push("/dashboard");
		}
	};

	// Verifies whether the user is a member of the current room
	const isRoomMember = () => {
		const { username } = authState.user;
		if (room.admin === username || room.id < 0) return true;
		return room.members.filter(member => member === username).length;
	};

	// Send a new message
	const handleMessageSubmit = async (e: FormE) => {
		e.preventDefault();
		const message = {
			sender: authState.user.username,
			value,
			room_id: room.id,
		};

		// Emit and push the message
		socket.emit("send-message", message, room.members);
		setValue("");
	};

	useEffect(() => {
		if (!socket) return;
		socket.on("receive-message", (message: IMessage) => {
			setRoom({
				...room,
				messages: [...room.messages, message],
			});
			console.log("rooms set");
			//return socket.off("receive-message"); // Close socket connection to prevent multiple messages from being received
		});
	}, [handleMessageSubmit]);

	const getLeaveRoomText = () => {
		const { username } = authState.user;
		return username === room.admin ? "Close Room" : "Leave Room";
	};

	// Remove a user as a room member or close the room if they're admin
	const handleLeaveRequest = () => {
		const { username } = authState.user;
		if (username === room.admin) {
			socket.emit("closed-room", room.id);
		} else {
			const message = {
				sender: username,
				value: `${username} left`,
				room_id: room.id,
			};
			socket.emit("left-room", username, room.id);
			socket.emit("send-message", message);
		}
		history.push("/dashboard");
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
							gutterBottom
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
					<Divider light />
					<section className={classes.messagesContainer}>
						{room.messages.map(message => (
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
				</Paper>
			</form>
		</>
	);
};

export default Room;
