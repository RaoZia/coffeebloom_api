const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

const createOrder = async (userId, total_amount) => {
  console.log("order placed", userId, total_amount);
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.ORDERS} (user_id, total_amount) values (?,?)`,
    [userId, total_amount],
  );
  return result;
};
module.exports = { createOrder };
