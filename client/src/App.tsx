import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { socket } from "./config/socket";
import Routes from "./routes/Routes";
import { useAuth } from "./contexts/authContext";
import { makeStyles } from "@material-ui/core";

const { Login, Dashboard, Room } = Routes;

const useStyles = makeStyles(theme => ({}));

function App() {
	const classes = useStyles();
	const { authState } = useAuth();

	return (
		<main>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/room/:slug" component={Room} />
			</Switch>
			<Route exact path="/">
				<div>
					<Link to="/dashboard">Go to Dashboard</Link>
				</div>
				<Link to="/login">Go to Login</Link>
			</Route>
		</main>
	);
}

export default App;
