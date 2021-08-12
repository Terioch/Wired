import React from "react";
import {
	Route,
	Switch,
	Redirect,
	RouteProps,
	useHistory,
} from "react-router-dom";
import Routes from "./routes/Routes";
import Client from "./api/Client";
import { Room as IRoom } from "./models/Room";
import { useAuth } from "./contexts/authContext";
import { useAuthAxios } from "./contexts/fetchContext";

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

const AuthorizedRoute: React.FC = ({ children }) => {
	const history = useHistory();
	const { authState } = useAuth();
	const { authAxios } = useAuthAxios();

	const fetchCurrentRoom = async () => {
		const pathnameParts = history.location.pathname.split("/");
		const slug = pathnameParts[pathnameParts.length - 1];
		const room = await Client.rooms.findOne(authAxios, slug);
		return room;
	};

	const userJoinedRoom = async () => {
		const { username } = authState.user;
		const room = await fetchCurrentRoom();
		console.log(username);
		if (room.info.admin === username) return true;
		return room.info.members.filter((member: any) => member === username)
			.length;
	};

	return <>{userJoinedRoom() ? children : <Redirect to="/dashboard" />}</>;
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
					<AuthorizedRoute>
						<Room />
					</AuthorizedRoute>
				</AuthenticatedRoute>
			</Switch>
		</main>
	);
}

export default App;
