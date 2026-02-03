const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
// ########################### All Milk Options ##############################
const getAllOptions = async () => {
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEE_MILK_OPTIONS} WHERE status = 1`,
  );
  return result;
};
// ########################### Get Single Milk Option by ID  ##############################
const getOptionById = async (id) => {
  const [existingUser] = await db.execute(
    `SELECT coffee_option_id FROM ${TABLE_NAMES.COFFEE_MILK_OPTIONS} WHERE coffee_option_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEE_MILK_OPTIONS} WHERE coffee_option_id =?`,
    [id],
  );
  return result;
};
module.exports = { getAllOptions, getOptionById };
