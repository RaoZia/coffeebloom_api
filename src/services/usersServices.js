const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
// ########################### Function to getAllUsers ##############################
const getAllUsers = async () => {
  const [rows] = await db.execute(
    `SELECT 
      u.id,
      u.email,
      ud.name,
      ud.address
    FROM ${TABLE_NAMES.USERS} u
    LEFT JOIN ${TABLE_NAMES.USERS_DETAILS} ud 
      ON u.id = ud.user_id
    WHERE u.status = 1
    `,
  );

  return rows;
};

module.exports = {
  getAllUsers,
};
