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
	Grid,
	Button,
	Typography,
	Divider,
	makeStyles,
} from "@material-ui/core";
import { CardMembershipTwoTone, RoomOutlined } from "@material-ui/icons";

const { Nav, RoomItem, CreateRoom, Search } = Components;

const useStyles = makeStyles(theme => ({
	main: {
		position: "fixed",
		height: "100vh",
		width: "100vw",
		paddingTop: "70px",
		backgroundColor: "#f6f6f6",
	},
	searchContainer: {
		paddingTop: "1rem",
		textAlign: "center",
	},
	roomsContainer: {
		padding: "0.9rem 0",
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

	const [rooms, setRooms] = useState<Array<Room>>([]);

	// Fetch all rooms where current user has joined then delineate
	useEffect(() => {
		Client.rooms.findAll().then(rooms => {
			setRooms(rooms);
		});
	}, []);

	// Filter rooms where user is either an admin or member
	const filterJoinedRooms = () => {
		const { username } = authState.user;
		return rooms.filter(room => {
			if (username === room.admin) return true;
			return room.members.filter(member => member === username).length;
		});
	};

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
						<Typography variant="h4">Chat Rooms</Typography>
						<Button className={classes.createRoom} color="secondary">
							Create Room
						</Button>
					</div>
				</section>
				<Grid container spacing={1}>
					{filterJoinedRooms().map((room: Room, idx: number) => (
						<Grid key={idx} item xs={12}>
							<RoomItem room={room} />
						</Grid>
					))}
				</Grid>
			</Container>
		</main>
	);
};

export default Dashboard;
