import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	SetStateAction,
	Dispatch,
} from "react";
import { AuthState } from "../models/Auth";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IAuthContext {
	authState: AuthState;
	setAuthInfo: (authInfo: AuthState) => void;
}

const AuthContext = createContext<IAuthContext>({
	authState: {
		token: null,
		expiresAt: null,
		user: { id: null, username: null },
	},
	setAuthInfo: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
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

	return (
		<AuthContext.Provider value={{ authState, setAuthInfo }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
