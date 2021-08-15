import React from "react";
import { Typography } from "@material-ui/core";

interface Props {}

const Spinner: React.FC<Props> = () => {
	return <Typography variant="h3">Loading...</Typography>;
};

export default Spinner;
