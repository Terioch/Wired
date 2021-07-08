import axios from "axios";

class Rooms {
	findAllExcluding = async (username: string | null) => {
		const { data } = await axios.post("/api/messages", username);
		return data;
	};
}

export default new Rooms();
