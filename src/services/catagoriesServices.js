const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
// ########################### Add catagories ##############################
const addCategory = async (data, imagePath) => {
  const { coffee_catagory_name } = data;
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.COFFEE_CATAGORY}
     (coffee_catagory_name)
     VALUES (?)`,
    [coffee_catagory_name],
  );
  const catId = result.insertId;
  await db.execute(
    `INSERT INTO ${TABLE_NAMES.IMAGES} (foreign_type, foreign_id,image_url) VALUES (?,?,?)`,
    [3, catId, imagePath],
  );

  const [rows] = await db.execute(
    `SELECT c.coffee_catagory_name, i.image_url FROM ${TABLE_NAMES.COFFEE_CATAGORY} c 
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON c.coffee_catagory_id = i.foreign_id 
    WHERE c.coffee_catagory_id = ? AND c.status = 1 `,
    [catId],
  );
  return rows;
};
// ########################### Get All catagories ##############################
const getAllCategories = async () => {
  const [rows] = await db.execute(
    `SELECT c.*, i.image_url FROM ${TABLE_NAMES.COFFEE_CATAGORY} c 
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON c.coffee_catagory_id = i.foreign_id AND foreign_type = 2
    WHERE c.status = 1 `,
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
    `SELECT c.*, i.image_url FROM ${TABLE_NAMES.COFFEE_CATAGORY} c 
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON c.coffee_catagory_id = i.foreign_id AND foreign_type = 2 
    WHERE c.coffee_catagory_id = ? AND c.status = 1 `,
    [id],
  );
  return result;
};
// ########################### Update CatagoryById ##############################
const updateCatById = async (id, data) => {
  const { coffee_catagory_name } = data;
  const [existingUser] = await db.execute(
    `SELECT coffee_catagory_id FROM ${TABLE_NAMES.COFFEE_CATAGORY} WHERE coffee_catagory_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  await db.execute(
    `UPDATE ${TABLE_NAMES.COFFEE_CATAGORY} SET coffee_catagory_name =? WHERE  coffee_catagory_id=? AND status = 1`,
    [coffee_catagory_name, id],
  );
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

module.exports = {
  addCategory,
  getAllCategories,
  getCatById,
  updateCatById,
  DeleteCatById,
};
