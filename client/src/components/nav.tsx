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
	logo: {
		flex: 1,
	},
	logoutContainer: {
		display: "flex",
		justifyContent: "flex-end",
		flex: 1,
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
				<Typography className={classes.logo} variant="h4">
					Wired
				</Typography>
				<Search />
				<div className={classes.logoutContainer}>
					<Button
						className={classes.logout}
						variant="outlined"
						onClick={users.signOut}
					>
						Logout
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Nav;
