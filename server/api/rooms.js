const db = require("../config/db");

class Rooms {
	findAll = async () => {
		const result = await db.query("SELECT * FROM rooms");
		return result.rows;
	};

	findAllJoined = async username => {
		const query =
			"SELECT * FROM rooms WHERE admin = $1 OR $1 = ANY(members)";
		const result = await db.query(query, [username]);
		return result.rows;
	};

	findAllByAdmin = async username => {
		const query = "SELECT * FROM rooms WHERE admin = $1";
		const result = await db.query(query, [username]);
		return result.rows;
	};

	findAllByMember = async username => {
		const query = "SELECT * FROM rooms WHERE $1 = ANY(members)";
		const result = await db.query(query, [username]);
		return result.rows;
	};

	findOne = async slug => {
		const query = "SELECT * FROM rooms WHERE slug = $1";
		const result = await db.query(query, [slug]);
		return result.rows[0];
	};

	insertOne = async (name, slug, admin) => {
		const query =
			"INSERT into rooms (name, slug, admin, members) VALUES ($1, $2, $3, ARRAY[$3]) RETURNING *";
		const result = await db.query(query, [name, slug, admin]);
		return result.rows[0];
	};

	insertMember = async (username, room_id) => {
		const query =
			"UPDATE rooms SET members = array_append(members, $1) WHERE id = $2 RETURNING *";
		const result = await db.query(query, [username, room_id]);
		return result.rows[0];
	};

	deleteMember = async (username, room_id) => {
		const query = "DELETE from rooms WHERE id = $1";
		const result = await db.query(query, [username, room_id]);
		return result.rows[0];
	};
}

module.exports = new Rooms();
