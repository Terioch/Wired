const { Pool, Client } = require("pg");
const connectionString = `postgressql://${process.env.REACT_APP_DB_USERNAME}:${process.env.REACT_APP_DB_PASSWORD}@localhost:5432/wired`;

module.exports = new Client({ connectionString });
