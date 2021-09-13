import React from "react";
import Dashboard from "../index";
import { AuthContext } from "../../../contexts/authContext";
import { render, fireEvent } from "@testing-library/react";

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

describe("<Dashboard />", () => {
	it("renders without crashing", () => {
		render(<MockDashboard />);
	});
});
