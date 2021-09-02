import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "../routes/dashboard";

import { render } from "@testing-library/react";

it("Renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Dashboard />, div);
});
