import axios from "axios";

class Users {
	sendValues = async (username: string, password: string) => {
		try {
			const body = { username, password };
			const { data } = await axios.post("/api/users", body);
			console.log(data);
			return data;
		} catch (err) {
			console.error(`POST ${err.message}`);
		}
	};
}

export default new Users();
