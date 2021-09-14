import React from "react";
import CreateRoom from "../index";
import { AuthContext } from "../../../contexts/authContext";
import { render, fireEvent } from "@testing-library/react";

const createTestProps = props => ({
	createRoomOpen: true,
	handleCreateRoomOpen: () => {},
	...props,
});

const MockCreateRoom = () => {
	const authState = {
		user: {
			id: 1,
			username: "Terioch",
		},
	};

	const props = createTestProps();

	return (
		<AuthContext.Provider value={{ authState, ...AuthContext }}>
			<CreateRoom {...props} />
		</AuthContext.Provider>
	);
};

describe("<CreateRoom />", () => {
	it("renders without crashing", () => {
		render(<MockCreateRoom />);
	});

	it("Closes when close icon is clicked", () => {
		const props = createTestProps();
		const { getByTestId } = render(<MockCreateRoom />);
		const closeEl = getByTestId("close");
		fireEvent.click(closeEl);
		expect(props.createRoomOpen).toBe(true);
	});
});
