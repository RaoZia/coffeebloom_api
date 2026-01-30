const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
// ########################### Add catagories ##############################
const addCoffeeSize = async (data) => {
  const { coffee_size_name, price } = data;
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.COFFEE_SIZES}
     (coffee_size_name, price)
     VALUES (?, ?)`,
    [coffee_size_name, price],
  );

  return { id: result.insertId, coffee_size_name, price };
};
const getAllSizes = async () => {
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEE_SIZES}
     WHERE  status = 1`,
  );
  return result;
};

module.exports = { addCoffeeSize, getAllSizes };
