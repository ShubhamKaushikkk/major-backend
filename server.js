const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const dotenv = require("dotenv");
const approuter = require("./Routers/approutes");
const client = require("./db/index");
const db = require("./db/index");
const app = express();
app.use(cors());
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v0", approuter);
const port = process.env.PORT || 5000;

const createDB = async () => {
  await db.query(
    `CREATE TABLE users(
        candidateName varchar,
        adharNumber BIGINT PRIMARY KEY ,
        sex varchar,
        age BIGINT,
        dob date,
        mobileNumber BIGINT,
        address varchar,
        state varchar,
        city varchar,
        fid BIGINT,
        isRegistered int,
        isvoted boolean default false,
        created_at TIMESTAMP DEFAULT NOW()
    )`
  );
};

client.connect((err) => {
  if (err) throw err;
  console.log("db connected!");

  client.query("SELECT * FROM users", (error, result, fields) => {
    if (error) {
      return console.error(error.message);
    } else {
    }
    // console.log(result);
  });
});
app.listen(port, () => {
  console.log("server is running on port ", port);
});
// createDB();
// module.exports = client;
