const response = {
	data: [
		{
			id: 1,
			name: "Test",
			slug: "test",
			admin: "Terioch",
			members: ["Terioch"],
			messages: [],
		},
		{
			id: 2,
			name: "Test 2",
			slug: "test-2",
			admin: "Tal",
			members: ["Tal"],
			messages: [],
		},
	],
};

const mockAxios = {
	get: jest.fn(() => Promise.resolve({ data: {} })),
	post: jest.fn(() => Promise.resolve({ data: {} })),
};

export default mockAxios;
