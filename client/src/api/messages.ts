import axios from "axios";

class Messages {
	fetchAll = async () => {
		try {
			const { data } = await axios.get("/api/messages");
			return data;
		} catch (err) {
			console.error(`GET ${err.message}`);
		}
	};
}

export default new Messages();
