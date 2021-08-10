import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../config/socket";
import CommonComponents from "../common/CommonComponents";
import { Room } from "../models/Room";
import { ChangeE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
import { Modal, Paper, Button, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const { Input } = CommonComponents;

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	paper: {
		position: "relative",
		padding: theme.spacing(2),
		textAlign: "center",
	},
	newRoom: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "1rem",
	},
	newRoomBtn: {
		marginTop: theme.spacing(2),
		fontSize: "18px",
	},
	close: {
		position: "absolute",
		right: "15px",
		cursor: "pointer",
		color: "grey",
		margin: "-0.5rem -0.5rem 2rem 0",
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
		let error = "";

		if (!slug) {
			error = "Room name cannot be empty";
		} else if (slug.length > 22) {
			error = "Room name cannot exceed 22 characters";
		}

		setRoomNameError(error);
		return error === "";
	};

	const getRouteInfo = (room: Room) => {
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
				history.push(getRouteInfo(room));
			});
		}
	};

	return (
		<Modal className={classes.modal} open={createRoomOpen}>
			<Paper className={classes.paper} elevation={12}>
				<Close
					className={classes.close}
					fontSize="small"
					onClick={handleCreateRoomOpen}
				/>
				<div className={classes.newRoom}>
					<Input
						label="Provide a room name..."
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
