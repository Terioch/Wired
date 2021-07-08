const db = require("../config/db");

class Rooms {
	findAllExcluding = async () => {
		const query = "SELECT * FROM rooms WHERE ";
		return await db.query(query);
	};

	findOne = async name => {
		const query = "SELECT * FROM rooms WHERE name = $1";
		return await db.query(query, [name]);
	};

	insertOne = async (name, admin) => {
		const query =
			"INSERT into rooms (name, admin) VALUES ($1, $2) RETURNING *";
		const result = await db.query(query, [name, admin]);
		return result.rows[0];
	};
}

module.exports = new Rooms();
