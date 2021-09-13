import React from "react";
import Dashboard from "../routes/dashboard";
import { AuthContext } from "../contexts/authContext";

const MockDashboard = () => {
	const authState = {
		user: {
			id: 1,
			username: "Terioch",
		},
	};

	return (
		<AuthContext.Provider value={{ authState, ...AuthContext }}>
			<Dashboard />
		</AuthContext.Provider>
	);
};

export default MockDashboard;
