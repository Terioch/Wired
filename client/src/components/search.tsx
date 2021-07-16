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
	input: {},
}));

const Search: React.FC<Props> = ({ rooms }) => {
	const classes = useStyles();
	const [filter, setFilter] = useState("");
	const [filteredRooms, setFilteredRooms] = useState<Array<Room>>([]);

	useEffect(() => {
		const filteredRooms = filterRooms();
		setFilteredRooms(filteredRooms);
	});

	const handleInputChange = (e: ChangeE) => {
		const { value } = e.target;
		setFilter(value);
	};

	const filterRooms = () => {
		if (!filter) return [];
		return rooms.filter(room => room.name === filter);
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
					<ListItem key={room.id}>{room.name}</ListItem>
				))}
			</List>
		</>
	);
};

export default Search;
