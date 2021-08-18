const { Pool } = require("pg");
// const connectionString = `postgressql://${process.env.REACT_APP_DB_USERNAME}:${process.env.REACT_APP_DB_PASSWORD}@localhost:5432/wired`;

const devConfig = {
	user: process.env.REACT_APP_DB_USERNAME,
	password: process.env.REACT_APP_DB_PASSWORD,
	database: process.env.REACT_APP_DB_NAME,
	host: process.env.REACT_APP_DB_HOST,
	port: process.env.REACT_APP_DB_PORT,
};

const prodConfig = {
	connectionString: process.env.DATABASE_URL, // Heroku add-on
};

const dev = process.env.NODE_ENV !== "production";
const config = dev ? devConfig : prodConfig;

module.exports = new Pool(config);
