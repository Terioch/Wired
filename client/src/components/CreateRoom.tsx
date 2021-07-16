import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../config/socket";
import { Room } from "../models/Room";
import { ChangeE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
import {
	Modal,
	Paper,
	TextField,
	Button,
	makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
	},
	newRoom: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	newRoomBtn: {
		marginTop: theme.spacing(2),
		fontSize: "18px",
	},
	close: {
		float: "right",
		cursor: "pointer",
		color: "grey",
		"&:hover": {
			color: "#A1A0A0",
		},
	},
}));

interface Props {
	createRoomOpen: boolean;
	handleCreateRoomOpen: () => void;
}

const CreateRoom: React.FC<Props> = ({
	createRoomOpen,
	handleCreateRoomOpen,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const { authState } = useAuth();

	const [roomName, setRoomName] = useState("");
	const [roomNameError, setRoomNameError] = useState("");

	const handleInputChange = (e: ChangeE) => {
		const { value } = e.target;
		setRoomName(value);
	};

	const validateRoomName = (slug: string) => {
		const temp =
			slug.length < 21 ? "" : "Room Name cannot exceed 22 characters";
		setRoomNameError(temp);
		return temp === "";
	};

	const getRoomRouteInfo = (room: Room) => {
		return {
			pathname: `/room/${room.slug}`,
			state: { room },
		};
	};

	const createNewRoom = () => {
		const roomNameSlug = roomName.toLowerCase().split(" ").join("-");
		const info = {
			name: roomName,
			slug: roomNameSlug,
			admin: authState.user.username,
		};

		// Verify if room name is unique and then redirect to the room route
		if (validateRoomName(roomNameSlug)) {
			socket.emit("new-room", info);

			socket.on("new-room-error", (error: string) => {
				setRoomNameError(error);
			});

			socket.on("new-room", (room: Room) => {
				history.push(getRoomRouteInfo(room));
			});
		}
	};

	return (
		<Modal open={createRoomOpen}>
			<Paper className={classes.paper} elevation={12}>
				<Close
					className={classes.close}
					fontSize="large"
					onClick={handleCreateRoomOpen}
				/>
				<div className={classes.newRoom}>
					<TextField
						label="Provide a room name..."
						color="secondary"
						value={roomName}
						onChange={handleInputChange}
						error={roomNameError ? true : false}
						helperText={roomNameError}
					/>
					<Button
						className={classes.newRoomBtn}
						variant="contained"
						color="primary"
						size="large"
						onClick={createNewRoom}
					>
						Create Room
					</Button>
				</div>
			</Paper>
		</Modal>
	);
};

export default CreateRoom;
