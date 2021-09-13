import React from "react";
import Nav from "../index";
import { fireEvent, render } from "@testing-library/react";

describe("<Nav />", () => {
	test("Renders with correct content", () => {
		const { getByRole } = render(<Nav />);
		const logoEl = getByRole("heading");
		const logoutEl = getByRole("button");

		expect(logoEl.textContent).toBe("Wired");
		expect(logoutEl.textContent).toBe("Logout");
	});

	test("Logout button removes user data from local storage", () => {
		const { getByRole } = render(<Nav />);
		const logoutEl = getByRole("button");

		fireEvent.click(logoutEl);
	});
});
