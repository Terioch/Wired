import React, { useState } from "react";
import { Room } from "../models/Room";
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setFilter(value);
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
			<List dense color="primary"></List>
		</>
	);
};

export default Search;
