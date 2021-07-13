const db = require("../config/db");

class Messages {
	insertOne = async message => {
		const { sender, value, roomId } = message;
		const query =
			"INSERT INTO messages (sender, value, room_id) VALUES ($1, $2, $3)";
		const result = await db.query(query, [sender, value, roomId]);
		return result.rows[0];
	};
}

module.exports = new Messages();
