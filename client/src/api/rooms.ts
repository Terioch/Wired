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

	findOne = async (id: number) => {
		try {
			const { data } = await axios.post(`/api/rooms/${id}`);
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};
}

export default new Rooms();
