import React from "react";
import Spinner from "../common/Spinner";
import { Modal, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

interface Props {}

const LoadingScreen: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Modal open>
			<Spinner />
		</Modal>
	);
};

export default LoadingScreen;
