import React from "react";
import Components from "./Components";
import users from "../api/users";
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
	},
	logout: {
		color: "#ffffff",
		border: "1px solid #A9A9A9",
	},
}));

const Nav: React.FC<Props> = () => {
	const { Search } = Components;
	const classes = useStyles();

	return (
		<AppBar position="static" color="secondary">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5">Wired</Typography>
				<Search />
				<Button
					className={classes.logout}
					variant="outlined"
					onClick={users.signOut}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Nav;
