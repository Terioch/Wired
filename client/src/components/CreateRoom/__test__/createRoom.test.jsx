import React from "react";
import CreateRoom from "../index";
import { AuthContext } from "../../../contexts/authContext";
import { render, fireEvent } from "@testing-library/react";

const createTestProps = props => ({
	createRoomOpen: true,
	handleCreateRoomOpen: () => {
		createRoomOpen = false;
	},
	...props,
});

const MockCreateRoom = () => {
	const authState = {
		user: {
			id: 1,
			username: "Terioch",
		},
	};

	return (
		<AuthContext.Provider value={{ authState, ...AuthContext }}>
			<CreateRoom />
		</AuthContext.Provider>
	);
};

describe("<CreateRoom />", () => {
	it("renders without crashing", () => {
		const props = createTestProps();
		render(<MockCreateRoom {...props} />);
	});

	it("Closes when close icon is clicked", () => {
		const props = createTestProps();
		const { getByTestId } = render(<MockCreateRoom {...props} />);
		const closeEl = getByTestId("close");
		fireEvent.click(closeEl);
		expect(props.createRoomOpen).toBe(true);
	});
});
