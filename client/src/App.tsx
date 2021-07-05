import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { socket } from "./config/socket";
import Routes from "./routes/Routes";
import { useAuth } from "./contexts/authContext";
import {} from "@material-ui/core";

const { Login, Dashboard, Room } = Routes;

function App() {
	const { authState } = useAuth();
	console.log(authState);

	return (
		<main>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/:id" component={Room} />
			</Switch>
			<div>
				<Link to="/dashboard">Go to Dashboard</Link>
			</div>
			<Link to="/login">Go to Login</Link>
		</main>
	);
}

export default App;
