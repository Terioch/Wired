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

	findOne = async (slug: string) => {
		try {
			const { data } = await axios.post(`/api/rooms/${slug}`);
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};
}

export default new Rooms();
