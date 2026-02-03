const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
// ########################### Function to getAllUsers ##############################
const getSingleuser = async (id) => {
  const [existingUser] = await db.execute(
    `SELECT id FROM ${TABLE_NAMES.USERS} WHERE id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.USER_NOT_FOUND);
  }
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
// ########################### Function to getAllUsers ##############################
const getAllUsers = async () => {
  const [rows] = await db.execute(
    `SELECT 
      u.id,
      u.email,
      ud.name,
      ud.address,
      i.image_url
    FROM ${TABLE_NAMES.USERS} u
    LEFT JOIN ${TABLE_NAMES.USERS_DETAILS} ud 
      ON u.id = ud.user_id
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON i.foreign_type = 1 AND i.foreign_id =u.id 
    AND u.status = 1
    `,
  );

  return rows;
};
// ########################### Function to updateUser ##############################
const updateById = async (id, { email, name, address }, imagePath) => {
  // ########################### check for isUser or not ##############################
  const [existingUser] = await db.execute(
    `SELECT id FROM ${TABLE_NAMES.USERS} WHERE id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.USER_NOT_FOUND);
  }
  // ########################### Query to update tbl_users ##############################
  await db.execute(
    `UPDATE ${TABLE_NAMES.USERS} SET email = ?  WHERE id=? AND status = 1 `,
    [email, id],
  );
  // ########################### Query to update tbl_users_details ##############################
  await db.execute(
    `UPDATE ${TABLE_NAMES.USERS_DETAILS} SET name = ? , address = ? WHERE user_id=? AND status = 1 `,
    [name, address, id],
  );
  // ########################### Query to insert image in tbl_imgs ##############################
  const [storeImg] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.IMAGES} (foreign_type, foreign_id,image_url) VALUES (?,?,?)`,
    [1, id, imagePath],
  );
  // const ImgId = storeImg.insertId;
  // ########################### Query to update tbl_users_details ##############################
  // await db.execute(
  //   `UPDATE ${TABLE_NAMES.USERS_DETAILS} SET image_id = ? WHERE user_id = ?`,
  //   [ImgId, id],
  // );
  // ########################### Query to return updated record ##############################
  const [result] = await db.execute(
    `SELECT
        u.id,
        u.email,
        ud.name,
        ud.address,
        i.image_url
      FROM ${TABLE_NAMES.USERS} u
      LEFT JOIN ${TABLE_NAMES.USERS_DETAILS} ud
        ON u.id = ud.user_id
      LEFT JOIN ${TABLE_NAMES.IMAGES} i ON i.foreign_id = u.id
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
