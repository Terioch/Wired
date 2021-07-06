import React, { useState } from "react";
import Components from "../components/Components";
import {
	Grid,
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

const Dashboard: React.FC<Props> = ({}) => {
	const classes = useStyles();

	return (
		<main className={classes.main}>
			<Nav />
			<Container className={classes.container}>
				<Paper className={classes.paper} elevation={12}>
					<div className={classes.newRoom}>
						<Typography variant="h4" gutterBottom>
							Create a new room
						</Typography>
						<TextField label="Provide a room name..." color="secondary" />
						<Button
							className={classes.newRoomBtn}
							variant="contained"
							color="primary"
							size="large"
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
