import React from "react";
import { useAuth } from "../contexts/authContext";
import {
	Typography,
	AppBar,
	Toolbar,
	Button,
	makeStyles,
} from "@material-ui/core";

interface Props {}

const useStyles = makeStyles(theme => ({
	appbar: {
		backgroundColor: "#27262C",
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: theme.spacing(0, 3),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(0, 1.5),
		},
	},
	logo: {},
	logout: {
		color: "#ffffff",
		backgroundColor: "#28992E",
		"&:hover": {
			backgroundColor: "#1E8F29",
		},
	},
}));

const Nav: React.FC<Props> = () => {
	const classes = useStyles();
	const { logout } = useAuth();

	return (
		<AppBar className={classes.appbar} position="fixed">
			<Toolbar className={classes.toolbar}>
				<Typography className={classes.logo} variant="h4">
					Wired
				</Typography>
				<Button
					className={classes.logout}
					variant="contained"
					size="large"
					onClick={logout}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Nav;
