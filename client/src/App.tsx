import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Routes from "./routes/Routes";
import Components from "./components/Components";
import { useAuth } from "./contexts/authContext";
import { makeStyles } from "@material-ui/core";

const { Login, Dashboard, Room } = Routes;

const useStyles = makeStyles(theme => ({}));

function App() {
	const classes = useStyles();
	const { isAuthenticated } = useAuth();

	const authenticatedRoutes = <Dashboard />;

	return (
		<main>
			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						isAuthenticated() ? (
							<Redirect to="/dashboard" />
						) : (
							<Redirect to="/login" />
						)
					}
				/>
				<Route exact path="/login" component={Login} />
				<Route
					exact
					path="/dashboard"
					render={() =>
						isAuthenticated() ? <Dashboard /> : <Redirect to="/login" />
					}
				/>
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
