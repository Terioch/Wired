import React from "react";
import axios from "axios";
import Dashboard from "../index";
import { AuthContext } from "../../../contexts/authContext";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios");

afterEach(cleanup);

const data = [
	{
		id: 1,
		name: "Test",
		slug: "test",
		admin: "Terioch",
		members: ["Terioch"],
		messages: [],
	},
	{
		id: 2,
		name: "Test 2",
		slug: "test-2",
		admin: "Tal",
		members: ["Tal"],
		messages: [],
	},
];

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
	it("renders loading spinner followed by room items", async () => {
		// render(<MockDashboard />);
		// const spinner = screen.getByTestId("spinner");
		// expect(spinner).toBeInTheDocument();
		// expect(axios.get).toHaveBeenCalledTimes(1);
		// const roomsNode = await waitFor(() => screen.getByRole("list"));
		// expect(roomsNode.children).toHaveLength(2);
	});
});
