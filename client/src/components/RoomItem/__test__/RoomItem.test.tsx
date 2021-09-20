import React from "react";
import RoomItem from "../index";
import { Room } from "../../../models/Room";
import { AuthContext } from "../../../contexts/authContext";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

const setRoom = (admin?: string) => {
	return {
		id: 1,
		name: "Test",
		slug: "test",
		admin: admin || "Terioch",
		members: ["Terioch"],
		messages: [],
	};
};

const MockRoomItem: React.FC<{ room: Room }> = ({ room }) => {
	const authValues = {
		authState: {
			user: {
				id: 1,
				username: "Terioch",
			},
			token: "123456",
			expiresAt: "1632129083",
		},
		setAuthInfo: jest.fn(),
		isAuthenticated: jest.fn(),
		logout: jest.fn(),
	};

	return (
		<AuthContext.Provider value={{ ...authValues }}>
			<RoomItem room={room} />
		</AuthContext.Provider>
	);
};

describe("<RoomItem />", () => {
	beforeEach(() => {
		render(<MockRoomItem room={setRoom()} />);
	});

	it("Renders with correct room admin when authenticated user is the admin", () => {
		const roomAdminEl = screen.getByText(/Admin: You/i);
		console.log(roomAdminEl);
		expect(roomAdminEl).toBeInTheDocument();
	});

	it("Renders with correct room admin when authenticated user is not the admin", () => {
		const room = setRoom("Tal");
		render(<MockRoomItem room={room} />);
		const roomAdminEl = screen.getByText(`Admin: ${room.admin}`);
		expect(roomAdminEl).toBeInTheDocument();
	});

	it("Renders with correct room name", () => {
		const room = setRoom();
		const roomNameEl = screen.getByText(room.name);
		console.log(roomNameEl);
		expect(roomNameEl).toBeInTheDocument();
	});
});
