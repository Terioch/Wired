import React from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
import Routes from "./routes/Routes";
import { RoomProvider } from "./contexts/roomContext";
import { useAuth } from "./contexts/authContext";

const { Login, Dashboard, Room } = Routes;

const AuthenticatedRoute: React.FC<RouteProps> = ({
	children,
	...rest
}) => {
	const { isAuthenticated } = useAuth();

	return (
		<Route
			{...rest}
			render={() =>
				isAuthenticated() ? children : <Redirect to="/login" />
			}
		/>
	);
};

function App() {
	const { isAuthenticated } = useAuth();

	return (
		<main>
			<Switch>
				<AuthenticatedRoute exact path="/">
					<Redirect to="/dashboard" />
				</AuthenticatedRoute>
				<Route
					exact
					path="/login"
					render={() =>
						isAuthenticated() ? <Redirect to="/dashboard" /> : <Login />
					}
				/>
				<AuthenticatedRoute exact path="/dashboard">
					<Dashboard />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path="/room/:slug">
					<RoomProvider>
						<Room />
					</RoomProvider>
				</AuthenticatedRoute>
			</Switch>
		</main>
	);
}

export default App;
