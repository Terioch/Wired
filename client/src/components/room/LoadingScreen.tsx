import React from "react";
import Spinner from "../common/Spinner";
import { Modal, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	modal: {
		zIndex: 10,
	},
}));

interface Props {}

const LoadingScreen: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Modal className={classes.modal} open hideBackdrop>
			<Spinner />
		</Modal>
	);
};

export default LoadingScreen;
