const db = require("../config/db");

class Messages {
	findAllByRoom = async room_id => {
		const query = "SELECT * FROM messages WHERE room_id = $1";
		const result = await db.query(query, [room_id]);
		return result.rows;
	};

	insertOne = async message => {
		const { sender, value, room_id, is_default } = message;
		const query =
			"INSERT INTO messages (sender, value, room_id, is_default) VALUES ($1, $2, $3, $4) RETURNING *";
		const result = await db.query(query, [
			sender,
			value,
			room_id,
			is_default,
		]);
		return result.rows[0];
	};
}

module.exports = new Messages();
