import React from "react";
import CreateRoom from "../index";
import { render, fireEvent } from "@testing-library/react";

const createTestProps = props => ({
	createRoomOpen: true,
	handleCreateRoomOpen: () => {
		createRoomOpen = false;
	},
	...props,
});

describe("<CreateRoom />", () => {
	it("renders without crashing", () => {
		const props = createTestProps();
		render(<CreateRoom {...props} />);
	});

	it("Closes when close icon is clicked", () => {
		const props = createTestProps();
		const { getByRole } = render(<CreateRoom {...props} />);
		const closeEl = getByRole("button");
		fireEvent.click(closeEl);
		expect(props.createRoomOpen).toBe(false);
	});
});
