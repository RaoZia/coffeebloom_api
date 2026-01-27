const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

const addCoffee = async ({ name }) => {
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.COFFEES}  (coffee_name) VALUES (?)`,
    [name],
  );
  return result;
};

module.exports = { addCoffee };
