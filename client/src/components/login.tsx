import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	background: {
		height: "100vh",
		width: "100vw",
		backgroundColor: "#333",
	},
}));

interface props {}

const Login: React.FC<props> = ({}) => {
	const classes = useStyles();

	return <div className={classes.background}></div>;
};

export default Login;
