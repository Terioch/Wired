import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { socket } from "../config/socket";
import Components from "../components/Components";
import Client from "../api/Client";
import { Room as IRoom, Message as IMessage } from "../models/Room";
import { ChangeE, FormE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
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

const { Message } = Components;

const useStyles = makeStyles(theme => ({
	main: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(2.5),
	},
	paper: {
		minHeight: "91.8vh",
		width: "700px",
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(1.5),
		backgroundColor: "#eeeeee",
	},
	header: {
		display: "grid",
		padding: "0 .5rem",
		"& > *": {
			gridColumnStart: "1",
			gridRowStart: "1",
			justifySelf: "center",
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
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "flex-end",
			padding: theme.spacing(0),
		},
	},
	input: {},
	leaveBtn: {
		alignSelf: "flex-end",
		justifySelf: "right",
		backgroundColor: "red",
		color: "#ffffff",
		"&:hover": {
			backgroundColor: "red",
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
	const classes = useStyles();
	const location: Location = useLocation();
	const history = useHistory();
	const { authState } = useAuth();

	const [room, setRoom] = useState<IRoom>({
		id: -1,
		name: "",
		slug: "",
		admin: "",
		members: [],
		messages: [],
	});
	const [value, setValue] = useState("");

	// Fetch data for the current room
	useEffect(() => {
		location.state ? fetchRoomFromLocation() : fetchRoomFromServer();
	}, []);

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
		const pathnameParts = location.pathname.split("/");
		const slug = pathnameParts[pathnameParts.length - 1];
		const { info, messages } = await Client.rooms.findOne(slug);
		setRoom({ ...info, messages });
	};

	// Send a new message
	const handleSubmit = async (e: FormE) => {
		e.preventDefault();
		const message = {
			sender: authState.user.username,
			value: value,
			room_id: room.id,
		};

		// Emit message via socket signal
		socket.emit("send-message", message);
		socket.on("return-message", (message: IMessage) => {
			const messages = [...room.messages];
			messages.push(message);
			setRoom({ ...room, messages });
		});
		setValue("");
	};

	const getLeaveRoomText = () => {
		const { username } = authState.user;
		return username === room.admin ? "Close Room" : "Leave";
	};

	// Removes user from the current room
	const handleLeaveRequest = () => {
		const { username } = authState.user;
		if (username === room.admin) {
			socket.emit("closed-room", room.id);
		} else {
			const message = {
				sender: username,
				value: `${username} left`,
				room_id: room.id,
			}
			socket.emit("left-room", username, room.id);
			socket.emit("send-message", message);
		}
		history.push("/dashboard");
	};

	return (
		<form className={classes.main} onSubmit={handleSubmit}>
			<Paper className={classes.paper} elevation={3}>
				<section className={classes.header}>
					<ArrowBackRounded
						className={classes.arrowBack}
						onClick={() => handleRouting("/dashboard")}
					/>
					<Typography
						className={classes.title}
						variant="h5"
						color="secondary"
						gutterBottom
					>
						{room.name}
					</Typography>
				</section>
				<Divider light />
				<section className={classes.messagesContainer}>
					{room.messages.map(message => (
						<Message key={message.id} message={message} />
					))}
				</section>
				<section className={classes.footer}>
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
					<Button
						className={classes.leaveBtn}
						variant="contained"
						onClick={handleLeaveRequest}
					>
						{getLeaveRoomText()}
					</Button>
				</section>
			</Paper>
		</form>
	);
};

export default Room;
