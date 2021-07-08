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
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 1.5rem",
	},
	logo: {},
	logout: {
		color: "#ffffff",
		border: "1px solid #A9A9A9",
	},
}));

const Nav: React.FC<Props> = () => {
	const classes = useStyles();
	const { logout } = useAuth();

	return (
		<AppBar position="fixed" color="secondary">
			<Toolbar className={classes.toolbar}>
				<Typography className={classes.logo} variant="h4">
					Wired
				</Typography>
				<Button
					className={classes.logout}
					variant="outlined"
					onClick={logout}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Nav;
