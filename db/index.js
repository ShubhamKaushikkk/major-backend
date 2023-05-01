const { Client } = require("pg");
const dotenv = require("dotenv");
// const pgp = require("pg-promise")();
dotenv.config();
// const client = pgp(process.env.connectionString);
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});
module.exports = client;
