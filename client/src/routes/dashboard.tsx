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
	container: {},
	searchContainer: {
		paddingTop: "1rem",
		textAlign: "center",
	},
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
			<Container className={classes.container}>
				<div className={classes.searchContainer}>
					<Search rooms={rooms} />
				</div>
			</Container>
		</main>
	);
};

export default Dashboard;
