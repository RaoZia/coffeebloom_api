const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

// ########################### Add Coffee ##############################
const addCoffee = async (data) => {
  const { coffee_name, coffee_description, coffee_price } = data;
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.COFFEES}( coffee_name,coffee_description, coffee_price)
     VALUES ( ?, ?, ?)`,
    [coffee_name, coffee_description, coffee_price],
  );
  return { id: result.insertId, coffee_name, coffee_description, coffee_price };
};
// ########################### Get all coffees ##############################
const getAllCoffees = async () => {
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEES} WHERE status = 1`,
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
    `SELECT * FROM ${TABLE_NAMES.COFFEES} WHERE coffee_id =? AND status = 1`,
    [id],
  );
  return result;
};
// ########################### Get coffeeByID##############################
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
    `UPDATE ${TABLE_NAMES.COFFEES} SET coffee_name=?, coffee_description =?, coffee_price=?  WHERE coffee_id =? AND status = 1`,
    [id, coffee_name, coffee_description, coffee_price],
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
