import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	SetStateAction,
	Dispatch,
} from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface AuthState {
	token: string | null;
	expiresAt: string | null;
	user: string | null;
}

interface IAuthContext {
	authState: AuthState;
	setAuthState: Dispatcher<AuthState>;
}

const AuthContext = createContext<IAuthContext>({
	authState: { token: null, expiresAt: null, user: null },
	setAuthState: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>({
		token: null,
		expiresAt: null,
		user: null,
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
