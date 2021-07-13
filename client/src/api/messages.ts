import axios from "axios";

class Messages {
	fetchAllByRoom = async (roomId: number) => {
		try {
			const { data } = await axios.post("/api/messages", { roomId });
			return data;
		} catch (err) {
			console.error(`POST ${err.message}`);
		}
	};
}

export default new Messages();
