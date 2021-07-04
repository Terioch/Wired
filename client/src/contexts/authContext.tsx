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
	setAuthState: Dispatcher<AuthState>;
}

const AuthContext = createContext<IAuthContext>({
	authState: {
		token: null,
		expiresAt: null,
		user: { id: null, username: null },
	},
	setAuthState: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>({
		token: null,
		expiresAt: null,
		user: { id: null, username: null },
	});

	const setAuthInfo = ({ token, expiresAt, user }: AuthState) => {
		setAuthState({
			token,
			expiresAt,
			user,
		});
	};

	return (
		<AuthContext.Provider value={{ authState, setAuthState }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
