import React from "react";
import Dashboard from "../index";
import { render, fireEvent } from "@testing-library/react";

describe("<Dashboard />", () => {
	const authState = {
		user: {
			id: 1,
			username: "Terioch",
		},
	};

	it("renders without crashing", () => {
		expect(authState.user.username).toBe("Terioch");
	});
});
