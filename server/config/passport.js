const localStrategy = require("passport-local").Strategy;
const db = require("./db");
const bcrypt = require("bcrypt");

module.exports = function init(passport) {
	const authenticateUser = async (username, password, done) => {
		try {
			const query = "SELECT * FROM users WHERE username = $1";
			const result = await db.query(query, [username]);
			console.log(result.rows);
			if (result.rows.length > 0) {
				const user = result.rows[0];
				bcrypt.compare(password, user.password);
			}
		} catch (err) {
			console.error(err.message);
			throw err;
		}
	};

	passport.use(
		new localStrategy(
			{
				usernameField: "username",
				passwordField: "password",
			},
			authenticateUser
		)
	);
};
