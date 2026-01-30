const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

// ########################### Add Coffee ##############################
const addCoffee = async (data) => {
  const { coffee_name, coffee_description, coffee_price, coffee_catagory_id } =
    data;
  // const [catRecord] = await db.execute(
  //   `SELECT coffee_catagory_id FROM ${TABLE_NAMES.COFFEE_CATAGORY} WHERE coffee_catagory_id=? `,
  //   [coffee_catagory_id],
  // );
  // const catId = catRecord[0];
  // console.log("catagoryId is:", catRecord[0]);
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.COFFEES}( coffee_name,coffee_description, coffee_price,coffee_catagory_id)
     VALUES ( ?, ?, ?,?)`,
    [coffee_name, coffee_description, coffee_price, coffee_catagory_id],
  );
  const record = result.insertId;
  const [rows] = await db.execute(
    `SELECT c.coffee_id,c.coffee_name, c.coffee_description,c.coffee_price,c.rating,c.status,
    c1.coffee_catagory_id,c1.coffee_catagory_name FROM ${TABLE_NAMES.COFFEES} c
    LEFT JOIN ${TABLE_NAMES.COFFEE_CATAGORY} c1
    ON c1.coffee_catagory_id = c.coffee_catagory_id WHERE c.coffee_id = ? AND c.status = 1`,
    [record],
  );
  return rows;
};
// ########################### Get all coffees ##############################
const getAllCoffees = async () => {
  const [result] = await db.execute(
    `SELECT c.coffee_id,c.coffee_name, c.coffee_description,c.coffee_price,c.rating,c.status,
    c1.coffee_catagory_id,c1.coffee_catagory_name FROM ${TABLE_NAMES.COFFEES} c
    LEFT JOIN ${TABLE_NAMES.COFFEE_CATAGORY} c1
    ON c1.coffee_catagory_id = c.coffee_catagory_id 
    AND c.status = 1`,
  );
  return result;
};
// ########################### Get coffeeByID##############################
const getCoffeeById = async (id) => {
  const [existingUser] = await db.execute(
    `SELECT coffee_id FROM ${TABLE_NAMES.COFFEES} WHERE coffee_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT c.coffee_id,c.coffee_name, c.coffee_description,c.coffee_price,c.rating,c.status,
    c1.coffee_catagory_id,c1.coffee_catagory_name FROM ${TABLE_NAMES.COFFEES} c
    LEFT JOIN ${TABLE_NAMES.COFFEE_CATAGORY} c1
    ON c1.coffee_catagory_id = c.coffee_catagory_id 
    WHERE c.coffee_id = ?
    AND c.status = 1`,
    [id],
  );
  return result;
};
// ########################### Update coffeeByID##############################
const updateCoffeeById = async (id, data) => {
  const { coffee_name, coffee_description, coffee_price } = data;
  const [existingUser] = await db.execute(
    `SELECT coffee_id FROM ${TABLE_NAMES.COFFEES} WHERE coffee_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  await db.execute(
    `UPDATE ${TABLE_NAMES.COFFEES} SET coffee_name = ?, coffee_description = ?, coffee_price = ?  WHERE coffee_id =?`,
    [coffee_name, coffee_description, coffee_price, id],
  );

  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEES} WHERE coffee_id = ? AND status = 1`,
    [id],
  );
  return result;
};
// ########################### Get coffeeByID##############################
const DeleteCoffeeById = async (id) => {
  const [existingUser] = await db.execute(
    `SELECT coffee_id FROM ${TABLE_NAMES.COFFEES} WHERE coffee_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.COFFEES} SET status = 0 WHERE coffee_id =?`,
    [id],
  );
  return result;
};
module.exports = {
  addCoffee,
  getAllCoffees,
  getCoffeeById,
  updateCoffeeById,
  DeleteCoffeeById,
};
