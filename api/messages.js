const db = require("../config/db");

class Messages {
	findAllByRoom = async room_id => {
		const query = "SELECT * FROM messages WHERE room_id = $1";
		const result = await db.query(query, [room_id]);
		return result.rows;
	};

	insertOne = async message => {
		const { sender, value, room_id } = message;
		const query =
			"INSERT INTO messages (sender, value, room_id) VALUES ($1, $2, $3) RETURNING *";
		const result = await db.query(query, [sender, value, room_id]);
		return result.rows[0];
	};
}

module.exports = new Messages();
