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
	logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
	authState: {
		token: null,
		expiresAt: null,
		user: { id: null, username: null },
	},
	setAuthInfo: () => {},
	logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
	const history = useHistory();
	const [authState, setAuthState] = useState<AuthState>({
		token: null,
		expiresAt: null,
		user: { id: null, username: null },
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		const expiresAt = localStorage.getItem("expires-at");
		const user = localStorage.getItem("user-info");

		setAuthState({
			token,
			expiresAt,
			user: user ? JSON.parse(user) : {},
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
		<AuthContext.Provider value={{ authState, setAuthInfo, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
