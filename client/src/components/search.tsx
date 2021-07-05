import React, { useState } from "react";
import {
	TextField,
	InputAdornment,
	List,
	ListItem,
	makeStyles,
} from "@material-ui/core";

interface Props {}

const useStyles = makeStyles(theme => ({
	input: {},
}));

const Search: React.FC<Props> = () => {
	const classes = useStyles();
	const [filter, setFilter] = useState("");

	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setFilter(value);
	};

	return (
		<>
			<TextField
				className={classes.input}
				label="Search For Room By ID"
				variant="outlined"
				color="secondary"
				size="small"
				value={filter}
				onChange={handleFilter}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
				}}
			/>
			<List dense color="primary"></List>
		</>
	);
};

export default Search;
