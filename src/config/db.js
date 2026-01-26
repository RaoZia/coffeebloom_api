const mysql = require("mysql2/promise");
console.log(
  "Database is connected",
  process.env.DB_USER,
  process.env.DB_NAME,
  process.env.DB_HOST,
  process.env.DB_PORT,
);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
module.exports = db;
