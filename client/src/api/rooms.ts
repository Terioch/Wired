import { AxiosInstance } from "axios";

class Rooms {
	findAll = async (authAxios: AxiosInstance) => {
		try {
			const { data } = await authAxios.get("/api/rooms");
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};

	findAllByMember = async (
		authAxios: AxiosInstance,
		username: string | null
	) => {
		try {
			const { data } = await authAxios.post(
				"/api/rooms/members",
				username
			);
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};

	findOne = async (authAxios: AxiosInstance, slug: string) => {
		try {
			const { data } = await authAxios.post(`/api/room/${slug}`, { slug });
			return data;
		} catch (err) {
			console.error(err.message);
		}
	};
}

export default new Rooms();
