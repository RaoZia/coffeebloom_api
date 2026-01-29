const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
// ########################### Add catagories ##############################
const addCategory = async (data) => {
  const { coffee_catagory_name } = data;
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.COFFEE_CATAGORY}
     (coffee_catagory_name)
     VALUES (?)`,
    [coffee_catagory_name],
  );

  return { id: result.insertId, coffee_catagory_name };
};
// ########################### Get All catagories ##############################
const getAllCategories = async () => {
  const [rows] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEE_CATAGORY}
     WHERE status = 1`,
  );
  return rows;
};
// ########################### Get CatagoryById ##############################
const getCatById = async (id) => {
  const [existingUser] = await db.execute(
    `SELECT coffee_catagory_id FROM ${TABLE_NAMES.COFFEE_CATAGORY} WHERE coffee_catagory_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEE_CATAGORY} WHERE coffee_catagory_id =? AND status = 1`,
    [id],
  );
  return result;
};
// ########################### Delete catagoryById ##############################
const DeleteCatById = async (id) => {
  const [existingUser] = await db.execute(
    `SELECT coffee_catagory_id FROM ${TABLE_NAMES.COFFEE_CATAGORY} WHERE coffee_catagory_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.COFFEE_CATAGORY} SET status = 0 WHERE coffee_catagory_id =?`,
    [id],
  );
  return result;
};

module.exports = { addCategory, getAllCategories, getCatById, DeleteCatById };
