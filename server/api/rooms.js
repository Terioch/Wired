const db = require("../config/db");

class Rooms {
	findAllByAdmin = async username => {
		const query = "SELECT * FROM rooms WHERE admin = $1";
		return await db.query(query, [username]);
	};

	findOne = async slug => {
		const query = "SELECT * FROM rooms WHERE slug = $1";
		const result = await db.query(query, [slug]);
		return result.rows[0];
	};

	insertOne = async (name, slug, admin) => {
		const query =
			"INSERT into rooms (name, slug, admin, members) VALUES ($1, $2, $3, Array[$3]) RETURNING *";
		const result = await db.query(query, [name, slug, admin]);
		return result.rows[0];
	};
}

module.exports = new Rooms();
