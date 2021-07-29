import axios, { AxiosInstance } from "axios";
import { useAuth } from "../contexts/authContext";

class Rooms {
	/* Initialize authenticated instance of axios with token in authorization 
	header */
	authAxios: AxiosInstance;

	constructor(token: string | null) {
		this.authAxios = axios.create({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	findAll = async () => {
		try {
			const { data } = await this.authAxios.get("/api/rooms");
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};

	findAllByUser = async (username: string | null) => {
		try {
			const { data } = await axios.post("/api/rooms", username);
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};

	findOne = async (slug: string) => {
		try {
			const { data } = await axios.post(`/api/room/${slug}`, { slug });
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};
}

export default Rooms;
