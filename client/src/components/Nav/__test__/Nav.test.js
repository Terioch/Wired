import React from "react";
import Nav from "../index";
import { render } from "@testing-library/react";

test("Navigation renders with correct content", () => {
	const { getByTestId } = render(<Nav />);
	const logoEl = getByTestId("logo");
	const logoutEl = getByTestId("logout");

	expect(logoEl.textContent).toBe("Wired");
	expect(logoutEl.textContent).toBe("Logout");
});
