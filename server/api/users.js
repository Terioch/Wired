const db = require("../config/db");
const bcrypt = require("bcrypt");

class Users {
	insertUser = async (username, password) => {
		const query =
			"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, password";
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await db.query(query, [username, hashedPassword]);
		return result.rows[0];
	};

	// Check if login details are valid by comparing encrypted passwords
	authenticatePassword = async (password, user) => {
		try {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) return user;
			return null;
		} catch (err) {
			console.error(`Login error: ${err.message}`);
			throw err;
		}
	};

	// Query database for a specific username
	searchUsername = async username => {
		const query = "SELECT * FROM users WHERE username = $1";
		return await db.query(query, [username]);
	};
}

module.exports = new Users();
