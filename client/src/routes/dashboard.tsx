import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Components from "../components/Components";
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
	const [newRoomName, setNewRoomName] = useState("");

	const handleNewRoomName = (e: ChangeE) => {
		const { value } = e.target;
		setNewRoomName(value);
	};

	const createNewRoom = () => {
		history.push(`/room/${newRoomName}`);
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
							value={newRoomName}
							onChange={handleNewRoomName}
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
