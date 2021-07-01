import axios from "axios";

class Users {
	signIn = async (username: string, password: string) => {
		try {
			const body = { username, password };
			const { data } = await axios.post("/api/users", body, {
				withCredentials: true,
			});
			return data;
		} catch (err) {
			console.error(`POST ${err.message}`);
		}
	};
}

export default new Users();
