import React from "react";
import Components from "./Components";
import {
	Typography,
	AppBar,
	Toolbar,
	Button,
	makeStyles,
} from "@material-ui/core";

const { Search } = Components;

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
	const classes = useStyles();

	return (
		<AppBar position="static" color="secondary">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5">Wired</Typography>
				<Search />
				<Button className={classes.logout} variant="outlined">
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Nav;
