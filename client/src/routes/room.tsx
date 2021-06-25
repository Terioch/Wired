import React, { useState } from "react";
import { socket } from "../config/socket";

const Room: React.FC = () => {
	const [value, setValue] = useState("");

	socket.on("message", (message: any) => {
		console.log(message);
	});

	const handleSubmit = () => {
		socket.emit("message", value);
	};

	return (
		<div>
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button onClick={handleSubmit}>Send</button>
		</div>
	);
};

export default Room;
