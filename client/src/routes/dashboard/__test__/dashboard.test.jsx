import React from "react";
import mockAxios from "axios";
import Dashboard from "../index";
import { AuthContext } from "../../../contexts/authContext";
import { render, cleanup, waitFor } from "@testing-library/react";

jest.mock("axios");

afterEach(cleanup);

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
		mockAxios.get.mockResolvedValue({
			data: [
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
			],
		});
		const { findByRole, getByTestId } = render(<MockDashboard />);
		const spinner = getByTestId("spinner");
		expect(spinner).toBeInTheDocument();
		const roomsNode = await findByRole("list");
		expect(roomsNode).toBeInTheDocument();
	});
});
