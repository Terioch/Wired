import React, { useState } from "react";
import Components from "../components/Components";
import { Typography, makeStyles } from "@material-ui/core";

const { Nav } = Components;

interface Props {}

const useStyles = makeStyles(theme => ({}));

const Home: React.FC<Props> = ({}) => {
	const classes = useStyles();

	return (
		<>
			<Nav />
			<Typography variant="h4" color="secondary">
				Create and search for rooms here...
			</Typography>
		</>
	);
};

export default Home;
