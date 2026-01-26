const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
// ########################### Function to getAllUsers ##############################
const getSingleuser = async (id) => {
  const [result] = await db.execute(
    `SELECT 
      u.id,
      u.email,
      ud.name,
      ud.address
    FROM ${TABLE_NAMES.USERS} u
    LEFT JOIN ${TABLE_NAMES.USERS_DETAILS} ud 
      ON u.id = ud.user_id
    WHERE u.id = ? AND u.status = 1
    `,
    [id],
  );

  return result;
};
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

const updateById = async (id, { email, name, address }) => {
  // const [existingUser] = await db.execute(
  //   `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email=?  AND status = 1`,
  //   [email],
  // );
  // // ########################### Check Existing Email ##############################
  // if (existingUser.length > 0) {
  //   throw new Error(error.EMAIL_EXIST);
  // }
  await db.execute(
    `UPDATE ${TABLE_NAMES.USERS} SET email = ?  WHERE id=? AND status = 1 `,
    [email, id],
  );
  await db.execute(
    `UPDATE ${TABLE_NAMES.USERS_DETAILS} SET name = ? , address = ? WHERE user_id=? AND status = 1 `,
    [name, address, id],
  );

  const [result] = await db.execute(
    `SELECT
        u.id,
        u.email,
        ud.name,
        ud.address
      FROM ${TABLE_NAMES.USERS} u
      LEFT JOIN ${TABLE_NAMES.USERS_DETAILS} ud
        ON u.id = ud.user_id
      WHERE u.id = ? AND u.status = 1
      `,
    [id],
  );
  return result;
};

module.exports = {
  getSingleuser,
  getAllUsers,
  updateById,
};
