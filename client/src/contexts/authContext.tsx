import React, {
	useState,
	useEffect,
	useContext,
	createContext,
} from "react";

interface AuthState {
	token: string | null;
	expiresAt: string | null;
	user: string | null;
}

const AuthContext = createContext({});

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
