import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { socket } from "./config/socket";
import Components from "./components/Components";
import {} from "@material-ui/core";

const { Login, Room } = Components;

function App() {
	return (
		<main>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/:id" component={Room} />
			</Switch>
		</main>
	);
}

export default App;
