import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Components from "../components/Components";
import Client from "../api/Client";
import { socket } from "../config/socket";
import { ChangeE } from "../models/Events";
import { Room } from "../models/Room";
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

const { Nav, CreateRoom, Search } = Components;

const useStyles = makeStyles(theme => ({
	main: {
		paddingTop: "70px",
	},
	searchContainer: {
		paddingTop: "1rem",
		textAlign: "center",
	},
	roomsContainer: {
		padding: "0.5rem 0",
	},
	roomsHeader: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	createRoom: {},
}));

interface Props {}

const Dashboard: React.FC<Props> = ({}) => {
	const classes = useStyles();
	const history = useHistory();
	const { authState } = useAuth();

	const [rooms, setRooms] = useState([]);

	// Fetch all rooms where current user has joined then delineate
	useEffect(() => {
		Client.rooms.findAll().then(rooms => {
			setRooms(rooms);
		});
	}, []);

	return (
		<main className={classes.main}>
			<Nav />
			<Container>
				<div className={classes.searchContainer}>
					<Search rooms={rooms} />
				</div>
				<Divider light />
				<section className={classes.roomsContainer}>
					<div className={classes.roomsHeader}>
						<Typography variant="h3">Chat Rooms</Typography>
						<Button className={classes.createRoom} color="secondary">
							Create Room
						</Button>
					</div>
				</section>
			</Container>
		</main>
	);
};

export default Dashboard;
