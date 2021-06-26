import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { socket } from "./config/socket";
import Routes from "./routes/Routes";
import {} from "@material-ui/core";

const { Login, Home, Room } = Routes;

function App() {
	const user = false;

	return (
		<main>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/" component={Home} />
				<Route exact path={"/:id"} component={Room} />
			</Switch>
		</main>
	);
}

export default App;
