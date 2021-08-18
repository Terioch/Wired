import axios from "axios";

class Users {
	signIn = async (
		username: string,
		password: string,
		endpoint: string
	) => {
		try {
			const body = { username, password };
			const { data } = await axios.post(`/api/users/${endpoint}`, body);
			return data;
		} catch (err) {
			console.error(`POST ${err.message}`);
		}
	};
}

export default new Users();
