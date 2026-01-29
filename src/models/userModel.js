// const db = require("../config/db");
// const TABLE_NAMES = require("../constants/tableNames");
// const findUserByEmail = async (email) => {
//   const [rows] = await db.execute(
//     `SELECT * FROM ${TABLE_NAMES.USERS} WHERE user_email = ?`,
//     [email],
//   );
//   return rows[0];
// };

// const createUser = async (name, email, password) => {
//   const [result] = await db.execute(
//     `INSERT INTO ${TABLE_NAMES.USERS}  (user_name, user_email, password) VALUES (?, ?, ?)`,
//     [name, email, password],
//   );
// DATE_ADD(NOW(), INTERVAL 1 MINUTE)
//   return result.insertId;
// };

// module.exports = {
//   findUserByEmail,
//   createUser,
// };
