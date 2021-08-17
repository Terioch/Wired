const dev = process.env.NODE_ENV !== "production";

export const SERVER_URL = dev
	? "http://localhost:3000"
	: process.env.REACT_APP_VERCEL_URL;
