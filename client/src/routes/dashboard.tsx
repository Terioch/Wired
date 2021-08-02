import React, { useState, useEffect } from "react";
import Components from "../components/Components";
import Client from "../api/Client";
import { Room } from "../models/Room";
import { useAuth } from "../contexts/authContext";
import { useAuthAxios } from "../contexts/fetchContext";
import { useScreenSize } from "../contexts/screenSizeContext";
import {
	Container,
	Grid,
	Button,
	Typography,
	Divider,
	makeStyles,
} from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

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
		paddingTop: theme.spacing(2),
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
	createRoom: {
		display: "flex",
		alignItems: "flex-start",
		"& > *": {},
	},
}));

interface Props {}

const Dashboard: React.FC<Props> = ({}) => {
	const classes = useStyles();
	const { authState } = useAuth();
	const { authAxios } = useAuthAxios();
	const { screenWidth } = useScreenSize();

	const [rooms, setRooms] = useState<Array<Room>>([]);
	const [joinedRooms, setJoinedRooms] = useState<Array<Room>>([]);
	const [createRoomOpen, setCreateRoomOpen] = useState(false);

	// Fetch all rooms where current user has joined then delineate
	useEffect(() => {
		Client.rooms.findAll(authAxios).then(rooms => {
			setRooms(rooms);
		});
	}, [authAxios]);

	useEffect(() => {
		const joinedRooms = filterJoinedRooms();
		setJoinedRooms(joinedRooms);
	}, [rooms]);

	// Filter rooms where user is either an admin or member
	const filterJoinedRooms = () => {
		const { username } = authState.user;
		return rooms.filter(room => {
			if (username === room.admin) return true;
			return room.members.filter(member => member === username).length;
		});
	};

	// Toggle create room modal
	const handleCreateRoomOpen = () => {
		setCreateRoomOpen(!createRoomOpen);
	};

	return (
		<main className={classes.main}>
			<Nav />
			<Container>
				<div className={classes.searchContainer}>
					<Search rooms={rooms} joinedRooms={joinedRooms} />
				</div>
				<Divider light />
				<section className={classes.roomsContainer}>
					<div className={classes.roomsHeader}>
						<Typography variant={screenWidth < 310 ? "h5" : "h4"}>
							{screenWidth < 415 ? "Chat's" : "Chat Rooms"}
						</Typography>
						<Button
							className={classes.createRoom}
							color="secondary"
							onClick={handleCreateRoomOpen}
						>
							New Room
							<AddBox color="primary" style={{ marginLeft: ".25rem" }} />
						</Button>
					</div>
					<CreateRoom
						createRoomOpen={createRoomOpen}
						handleCreateRoomOpen={handleCreateRoomOpen}
					/>
				</section>
				<Grid container spacing={1}>
					{joinedRooms.map((room: Room) => (
						<Grid key={room.id} item xs={12}>
							<RoomItem room={room} />
						</Grid>
					))}
				</Grid>
			</Container>
		</main>
	);
};

export default Dashboard;
