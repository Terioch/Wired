import React from "react";
import axios from "axios";
import MockDashboard from "../../../__mocks__/dashboard";
import { render, cleanup, waitFor } from "@testing-library/react";

jest.mock("axios");

afterEach(cleanup);

describe("<Dashboard />", () => {
	it("renders room items correctly", async () => {
		axios.get.mockResolvedValue({
			data: [
				{
					id: 1,
					name: "Test",
					slug: "test",
					admin: "Terioch",
					members: ["Terioch"],
					messages: [],
				},
			],
		});
		const { findByRole } = render(<MockDashboard />);
		const roomsNode = await findByRole("list");
		expect(roomsNode.children).toHaveLength(1);
	});
});
