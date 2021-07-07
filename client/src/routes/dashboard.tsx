import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Components from "../components/Components";
import { socket } from "../config/socket";
import { useAuth } from "../contexts/authContext";
import {
	Container,
	Paper,
	Button,
	Typography,
	Divider,
	TextField,
	makeStyles,
} from "@material-ui/core";

const { Nav, Search } = Components;

interface Props {}

const useStyles = makeStyles(theme => ({
	main: {
		// height: "100vh",
		// width: "100vw",
	},
	container: {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	paper: {
		padding: "1rem",
		textAlign: "center",
	},
	newRoom: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	newRoomBtn: {
		marginTop: "1rem",
		fontSize: "18px",
	},
}));

type ChangeE = React.ChangeEvent<HTMLInputElement>;

const Dashboard: React.FC<Props> = ({}) => {
	const classes = useStyles();
	const history = useHistory();
	const { authState } = useAuth();
	const [roomName, setRoomName] = useState("");
	const [roomNameErrors, setRoomNameErrors] = useState("");

	const handleNewRoomName = (e: ChangeE) => {
		const { value } = e.target;
		setRoomName(value);
	};

	const validateRoomName = () => {
		const temp =
			roomName.length < 21 ? "" : "Room Name cannot exceed 22 characters";
		setRoomNameErrors(temp);
		return temp === "";
	};

	const createNewRoom = () => {
		const info = {
			name: roomName,
			admin: authState.user.username,
		};

		if (validateRoomName()) {
			// history.push(`/room/${newRoomName}`);
			socket.emit("new-room", info);
			console.log(authState.user.username);
		}
	};

	return (
		<main className={classes.main}>
			<Nav />
			<Container className={classes.container}>
				<Paper className={classes.paper} elevation={12}>
					<div className={classes.newRoom}>
						<Typography variant="h4" gutterBottom>
							Create a new room
						</Typography>
						<TextField
							label="Provide a room name..."
							color="secondary"
							value={roomName}
							onChange={handleNewRoomName}
							error={roomNameErrors ? true : false}
							helperText={roomNameErrors}
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
					<Divider style={{ margin: "2rem 0" }} />
					<div>
						<Typography variant="h4" style={{ marginBottom: "1rem" }}>
							Search for an existing room
						</Typography>
						<Search />
					</div>
				</Paper>
			</Container>
		</main>
	);
};

export default Dashboard;
