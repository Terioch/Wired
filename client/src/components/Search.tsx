import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CommonComponents from "./common/CommonComponents";
import { Room } from "../models/Room";
import { ChangeE } from "../models/Events";
import { useAuth } from "../contexts/authContext";
import { useSocket } from "../contexts/socketContext";
import { useScreenSize } from "../contexts/screenSizeContext";
import {
	InputAdornment,
	List,
	ListItem,
	makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	input: {
		textAlign: "center",
	},
	listItemContainer: {
		display: "flex",
		justifyContent: "center",
	},
	listItem: {
		width: "255px",
	},
}));

interface Props {
	rooms: Array<Room>;
	joinedRooms: Array<Room>;
}

const Search: React.FC<Props> = ({ rooms, joinedRooms }) => {
	const { Input } = CommonComponents;

	const classes = useStyles();
	const history = useHistory();
	const { authState } = useAuth();
	const { socket } = useSocket();
	const { screenWidth } = useScreenSize();

	const [filter, setFilter] = useState("");
	const [filteredRooms, setFilteredRooms] = useState<Array<Room>>([]);

	useEffect(() => {
		const filteredRooms = filterRooms();
		setFilteredRooms(filteredRooms);
	}, [filter]);

	const handleInputChange = (e: ChangeE) => {
		const { value } = e.target;
		setFilter(value);
	};

	const getInputAdornment = () => {
		return screenWidth < 415
			? {
					startAdornment: (
						<InputAdornment position="end">
							<SearchIcon />
						</InputAdornment>
					),
			  }
			: {
					endAdornment: (
						<InputAdornment position="end">
							<SearchIcon />
						</InputAdornment>
					),
			  };
	};

	// Keep track of room names that match the current filter
	const filterRooms = () => {
		if (!filter) return [];
		return rooms.filter(room => {
			const trimmedRoomName = room.name.trim().toLowerCase();
			const trimmedFilter = filter.trim().toLowerCase();
			return trimmedRoomName === trimmedFilter;
		});
	};

	// Add user as a room member if required and then navigate to the room
	const handleRoomNavigation = async ({ members, id, slug }: Room) => {
		const joined = joinedRooms.filter(r => r.id === id).length;
		if (!joined) {
			const { username } = authState.user;
			const message = {
				sender: username,
				value: `${username} joined`,
				room_id: id,
				is_default: true,
			};
			socket.emit("join-room", username, members, id);
			socket.emit("send-message", message, members);
		}
		history.push(`/room/${slug}`);
	};

	return (
		<>
			<Input
				className={classes.input}
				label="Search Room By Name"
				variant="outlined"
				size="small"
				value={filter}
				onChange={handleInputChange}
				InputProps={getInputAdornment()}
			/>
			<List color="primary" dense>
				{filteredRooms.map((room: Room) => (
					<div className={classes.listItemContainer} key={room.id}>
						<ListItem
							className={classes.listItem}
							alignItems="center"
							button
							onClick={() => handleRoomNavigation(room)}
						>
							{room.name}
						</ListItem>
					</div>
				))}
			</List>
		</>
	);
};

export default Search;
