const dev = process.env.NODE_ENV !== "production";

export const SERVER_URL = dev
	? "http://localhost:5000"
	: process.env.REACT_APP_SERVER_URL;
