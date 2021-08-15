import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	spinnerContainer: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: -1,
	},
	spinner: {
		border: "16px solid #e3e3e3",
		borderTop: "16px solid #388E3C",
		borderRadius: "50%",
		height: "130px",
		width: "130px",
		animation: "$spin 0.5s linear infinite",
		[theme.breakpoints.down("xs")]: {
			height: "70px",
			width: "70px",
		},
	},

	"@keyframes spin": {
		"0%": {
			transform: "rotate(0deg)",
		},
		"100%": {
			transform: "rotate(360deg)",
		},
	},
}));

interface Props {}

const Spinner: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Box className={classes.spinnerContainer}>
			<div className={classes.spinner} />
		</Box>
	);
};

export default Spinner;
