import axios from "axios";

class Rooms {
	findAll = async () => {
		const { data } = await axios.get("/api/messages");
		return data;
	};
}

export default new Rooms();
