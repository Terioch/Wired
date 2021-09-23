import React from "react";
import Spinner from "../index";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

const createTestProps = (color: string) => {
	return {
		color,
	};
};

describe("<Spinner />", () => {
	it("Spinner renders with correct colour", () => {
		const { color } = createTestProps("#388E3C");
		const { getByTestId } = render(<Spinner color={color} />);
		const spinner = getByTestId("spinner");
		expect(spinner).toHaveStyle(`borderTop: 16px solid ${color}`);
	});
});
