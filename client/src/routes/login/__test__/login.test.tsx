import React from "react";
import Login from "../index";
import {
	render,
	screen,
	fireEvent,
	cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

interface Input {
	label: string;
	value: string;
}

interface InputFields {
	username: Input;
	password: Input;
}

interface InputValues {
	username: string | RegExp;
	password?: string | RegExp;
}

const inputFields: InputFields = {
	username: {
		label: "Username",
		value: "Terioch",
	},
	password: {
		label: "Password",
		value: "123456",
	},
};

// function getInputFieldsByLabel() {
// 	Object.keys(inputFields).forEach(item => {
// 		inputFields[item].val = screen.getByLabelText(inputFields[item].label);
// 	});
// }

function insertInputValues({ username, password }: InputValues) {
	const usernameInput = screen.getByLabelText("Username");
	const passwordInput = screen.getByLabelText("Password");
	fireEvent.change(usernameInput, { target: { value: username } });
	fireEvent.change(passwordInput, { target: { value: password } });
}

function getInputErrorElements({ username, password }: InputValues) {
	password =
		password ||
		/password must contain at least 8 characters with at least one uppercase letter, lowercase letter and number/i;
	return {
		username: screen.getByText(username),
		password: screen.getByText(password),
	};
}

describe("<Login />", () => {
	it("Inputs render correctly", () => {
		const { getByLabelText } = render(<Login />);
		const usernameInput = getByLabelText("Username");
		const passwordInput = getByLabelText("Password");
		expect(usernameInput && passwordInput).toBeInTheDocument();
	});

	it("Ensure sign-in buttons render with correct content", () => {
		const { getByRole } = render(<Login />);
		const registerBtn = getByRole("button", { name: /Register/i });
		const loginBtn = getByRole("button", { name: /Login/i });
		expect(registerBtn && loginBtn).toBeInTheDocument();
	});

	it("Inputs update with correct values", async () => {
		const { getByLabelText } = render(<Login />);
		const usernameInput = getByLabelText("Username");
		const passwordInput = getByLabelText("Password");
		insertInputValues({ username: "Terioch", password: "123456" });
		expect(usernameInput).toHaveValue("Terioch");
		expect(passwordInput).toHaveValue("123456");
	});

	it("Displays correct errors when input values are empty", () => {
		const { getByRole } = render(<Login />);
		const registerBtn = getByRole("button", { name: /Register/i });
		insertInputValues({ username: "", password: "" });
		fireEvent.click(registerBtn);
		const errorElements = getInputErrorElements({
			username: /please enter a username/i,
		});
		// const errorElements = {
		// 	username: getByText(/Please enter a username/i),
		// 	password: getByText(
		// 		/Password must contain at least 8 characters with at least one uppercase letter, lowercase letter and number/i
		// 	),
		// };
		expect(
			errorElements.username && errorElements.password
		).toBeInTheDocument();
	});

	it("Displays correct errors when input values are non-empty but invalid", () => {
		const { getByRole } = render(<Login />);
		const loginBtn = getByRole("button", { name: /Login/i });
		insertInputValues({
			username: "Terioch-",
			password: "password123",
		});
		fireEvent.click(loginBtn);
		const errorElements = getInputErrorElements({
			username:
				/a username can only contain letters, numbers and underscores/i,
		});
		expect(
			errorElements.username && errorElements.password
		).toBeInTheDocument();
	});

	it("Displays correct error when username exceeds character length limit", () => {
		const { getByRole, getByText } = render(<Login />);
		const registerBtn = getByRole("button", { name: /Register/i });
		insertInputValues({ username: "abcdefghijklmnopqrstuvw" });
		fireEvent.click(registerBtn);
		const usernameErrorElement = getByText(
			/username cannot exceed 22 characters/i
		);
		expect(usernameErrorElement).toBeInTheDocument();
	});
});
