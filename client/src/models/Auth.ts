export interface User {
	id: number | null;
	username: string | null;
}

export interface AuthState {
	token: string | null;
	expiresAt: string | null;
	user: User;
}
