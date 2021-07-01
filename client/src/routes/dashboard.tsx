import React from "react";
import { Typography } from "@material-ui/core";

interface props {}

const Home: React.FC<props> = ({}) => {
	return (
		<div>
			<Typography variant="h4" color="secondary">
				Create and search for rooms here...
			</Typography>
		</div>
	);
};

export default Home;
