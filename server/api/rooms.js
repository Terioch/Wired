const db = require("../config/db");

class Rooms {
	findAllByAdmin = async username => {
		const query = "SELECT * FROM rooms WHERE admin = $1";
		const result = await db.query(query, [username]);
		return result.rows;
	};

	findAllByMember = async username => {
		// TODO: Find all rooms where user is a member
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

	insertMember = async (username, room_id) => {
		const query =
			"INSERT INTO rooms (members) VALUES ($1) WHERE room_id = $2 RETURNING *";
		const result = await db.query(query, [username, room_id]);
		return result.rows[0];
	};
}

module.exports = new Rooms();
