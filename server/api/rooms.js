const db = require("../config/db");

class Rooms {
	findAllExcluding = async username => {
		const query = "SELECT * FROM rooms WHERE admin = $1";
		return await db.query(query, [username]);
	};

	findOne = async name => {
		const query = "SELECT * FROM rooms WHERE name = $1";
		return await db.query(query, [name]);
	};

	insertOne = async (name, admin) => {
		const query =
			"INSERT into rooms (name, admin, members) VALUES ($1, $2, $3) RETURNING *";
		const result = await db.query(query, [name, admin, admin]);
		return result.rows[0];
	};
}

module.exports = new Rooms();
