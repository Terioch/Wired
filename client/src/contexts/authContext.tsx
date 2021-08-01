import React, {
	useState,
	useEffect,
	useContext,
	createContext,
} from "react";
import { useHistory } from "react-router-dom";
import { AuthState } from "../models/Auth";

interface IAuthContext {
	authState: AuthState;
	setAuthInfo: (authInfo: AuthState) => void;
	isAuthenticated: () => boolean;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
	const history = useHistory();

	const token = localStorage.getItem("token");
	const expiresAt = localStorage.getItem("expires-at");
	const user = localStorage.getItem("user-info");

	const [authState, setAuthState] = useState<AuthState>({
		token,
		expiresAt,
		user: { id: null, username: null },
	});

	useEffect(() => {
		setAuthState({
			token,
			expiresAt,
			user: user && JSON.parse(user),
		});
	}, []);

	const setAuthInfo = ({ token, expiresAt, user }: AuthState) => {
		localStorage.setItem("token", JSON.stringify(token));
		localStorage.setItem("expires-at", JSON.stringify(expiresAt));
		localStorage.setItem("user-info", JSON.stringify(user));

		setAuthState({
			token,
			expiresAt,
			user,
		});
	};

	const isAuthenticated = () => {
		if (!authState.token || !authState.expiresAt) {
			return false;
		}
		return new Date().getTime() / 1000 < parseInt(authState.expiresAt);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("expires-at");
		localStorage.removeItem("user-info");
		setAuthState({
			token: null,
			expiresAt: null,
			user: { id: null, username: null },
		});
		history.push("/login");
	};

	return (
		<AuthContext.Provider
			value={{ authState, setAuthInfo, isAuthenticated, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
