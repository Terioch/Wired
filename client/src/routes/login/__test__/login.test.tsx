import React from "react";
import Login from "../index";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("<Login />", () => {
	it("Renders without crashing", () => {
		render(<Login />);
		const usernameInput = screen.getByLabelText("Username");
		fireEvent.change(usernameInput, { target: { value: "Terioch" } });
		console.log(usernameInput);
		expect(usernameInput);
	});
});
