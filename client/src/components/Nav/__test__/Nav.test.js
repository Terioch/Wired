import React from "react";
import Nav from "../index";
import { fireEvent, render } from "@testing-library/react";

describe("Nav component tests", () => {
	test("Navigation renders with correct content", () => {
		const { getByTestId } = render(<Nav />);
		const logoEl = getByTestId("logo");
		const logoutEl = getByTestId("logout");

		expect(logoEl.textContent).toBe("Wired");
		expect(logoutEl.textContent).toBe("Logout");
	});

	test("Logout button removes user data from local storage", () => {
		const { getByTestId } = render(<Nav />);
		const logoutEl = getByTestId("logout");

		fireEvent.click(logoutEl);
	});
});
