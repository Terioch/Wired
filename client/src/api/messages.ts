import { SERVER_URL } from "../config/server";
import axios from "axios";

class Messages {
	fetchAllByRoom = async (roomId: number, slug: string) => {
		try {
			const endpoint = `${SERVER_URL}/api/room/${slug}/messages`;
			const { data } = await axios.post(endpoint, { roomId });
			return data;
		} catch (err) {
			console.error(`POST ${err.message}`);
		}
	};
}

export default new Messages();
