import axios from "axios";

interface Info {
	sender: string | null;
	value: string;
	roomId: number;
}

class Messages {
	fetchAllByRoom = async (username: string, roomId: number) => {
		try {
			const { data } = await axios.post("/api/messages", {
				username,
				roomId,
			});
			return data;
		} catch (err) {
			console.error(`POST ${err.message}`);
		}
	};
}

export default new Messages();
