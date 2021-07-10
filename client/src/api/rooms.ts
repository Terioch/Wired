import axios from "axios";

class Rooms {
	findAllExcluding = async (username: string | null) => {
		try {
			const { data } = await axios.post("/api/rooms", username);
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};

	findOne = async () => {
		try {
			// TODO: Get data for a specific room
		} catch (err) {
			console.error(err.message);
		}
	};
}

export default new Rooms();
