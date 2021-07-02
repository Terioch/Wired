import React, {
	useState,
	useEffect,
	useContext,
	createContext,
} from "react";

interface User {
	token: string | null;
	expiresAt: string | null;
	info: string | null;
}

const AuthContext = createContext({});

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User>({
		token: null,
		expiresAt: null,
		info: null,
	});

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
