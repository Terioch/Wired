const localStrategy = require("passport-local").Strategy;
const db = require("./db");
const bcrypt = require("bcrypt");

function initPassport(passport) {
	const authenticateUser = async (username, password, done) => {
		try {
			const query = "SELECT * FROM users WHERE username = $1";
			const result = await db.query(query, [username]);
			console.log(result.rows);

			// Check if passwords match
			if (result.rows.length > 0) {
				const user = result.rows[0];
				const isMatch = await bcrypt.compare(password, user.password);
				if (isMatch) {
					return done(null, user);
				}
				return done(null, false, { message: "Password is invalid" });
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

	// Store user id within a new session
	passport.serializeUser((user, done) => done(null, user.id));

	// Obtain user details from database and store within the new session
	passport.deserialize((id, done) => {
		try {
			const query = "SELECT * FROM users WHERE id = $1";
			const result = await db.query(query, [id]);
			return done(null, result.rows[0]);
		} catch (err) {
			console.error(err.message);
			throw err;
		}
	});
}

module.exports = initPassport;
