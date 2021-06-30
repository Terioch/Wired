const { Pool } = require("pg");
// const connectionString = `postgressql://${process.env.REACT_APP_DB_USERNAME}:${process.env.REACT_APP_DB_PASSWORD}@localhost:5432/wired`;

module.exports = new Pool({
	user: process.env.REACT_APP_DB_USERNAME,
	password: process.env.REACT_APP_DB_PASSWORD,
	database: "wired",
	host: "localhost",
	port: 5432,
});
