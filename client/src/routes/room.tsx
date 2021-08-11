import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { socket } from "../config/socket";
import Components from "../components/Components";
import Client from "../api/Client";
import { Room as IRoom, Message as IMessage } from "../models/Room";
import { ChangeE, FormE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
import { useAuthAxios } from "../contexts/fetchContext";
import { useScreenSize } from "../contexts/screenSizeContext";
import usePopover from "../controls/usePopover";
import {
	Typography,
	Paper,
	TextField,
	InputAdornment,
	Divider,
	Button,
	Popover,
	List,
	ListItem,
	makeStyles,
} from "@material-ui/core";
import { Send, ArrowBackRounded, MoreVert } from "@material-ui/icons";

const { Message } = Components;

const useStyles = makeStyles(theme => ({
	main: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(2.5),
	},
	paper: {
		minHeight: "91.8vh",
		maxWidth: "100%",
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
			// alignSelf: "center",
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
	dottedMenu: {
		justifySelf: "right",
		borderRadius: "25px",
		padding: theme.spacing(0.5),
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#dddddd",
		},
	},
	dottedMenuList: {
		backgroundColor: "#f6f6f6",
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
	const classes = useStyles();
	const location: Location = useLocation();
	const history = useHistory();
	const { authState } = useAuth();
	const { authAxios } = useAuthAxios();
	const { screenWidth } = useScreenSize();
	const { anchor, handleAnchorOpen, handleAnchorClose } = usePopover();

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
		const { info, messages } = await Client.rooms.findOne(authAxios, slug);
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

		// Emit and push the message
		socket.emit("send-message", message);
		socket.on("receive-message", (message: IMessage) => {
			const messages = [...room.messages];
			messages.push(message);
			setRoom({ ...room, messages });
		});
		setValue("");
	};

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

	const userJoinedRoom = () => {
		console.log(room.members);
		const { username } = authState.user;
		if (room.admin === username) return true;
		return room.members.filter(member => member === username).length;
	};

	return !userJoinedRoom() ? (
		//<Redirect to="/dashboard" />
		<Typography>Hi</Typography>
	) : (
		<form className={classes.main} onSubmit={handleSubmit}>
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
						<>
							<MoreVert
								className={classes.dottedMenu}
								onClick={handleAnchorOpen}
							/>
							<Popover
								open={Boolean(anchor)}
								anchorEl={anchor}
								onClose={handleAnchorClose}
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								<List className={classes.dottedMenuList}>
									<ListItem button onClick={handleLeaveRequest}>
										{getLeaveRoomText()}
									</ListItem>
								</List>
							</Popover>
						</>
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
	);
};

export default Room;
