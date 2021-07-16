import React, { useState, useEffect } from "react";
import { Room } from "../models/Room";
import { ChangeE } from "../models/Events";
import {
	TextField,
	InputAdornment,
	List,
	ListItem,
	makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

interface Props {
	rooms: Array<Room>;
}

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

const Search: React.FC<Props> = ({ rooms }) => {
	const classes = useStyles();
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

	const filterRooms = () => {
		if (!filter) return [];
		return rooms.filter(room => {
			const trimmedRoomName = room.name.trim().toLowerCase();
			return trimmedRoomName === filter;
		});
	};

	return (
		<>
			<TextField
				className={classes.input}
				label="Search For Room By Name"
				variant="outlined"
				size="small"
				value={filter}
				onChange={handleInputChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
			<List color="primary" dense>
				{filteredRooms.map((room: Room) => (
					<div className={classes.listItemContainer}>
						<ListItem
							className={classes.listItem}
							key={room.id}
							alignItems="center"
							button
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
