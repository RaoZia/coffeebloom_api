const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

// ########################### Create New ORDER ##############################
const createOrder = async (userId, total_amount, items) => {
  console.log("order placed", userId, total_amount, items);
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.ORDERS} (user_id, total_amount) values (?,?)`,
    [userId, total_amount],
  );
  const orderId = result.insertId;

  await db.execute(
    `INSERT INTO ${TABLE_NAMES.ORDER_ITEM} (order_id,quantity, price) VALUES (?,?,?)`,
    [orderId, items.quantity, items.price],
  );
};
// ########################### Get ALL ORDERS ##############################
const getAllOrders = async () => {
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.ORDERS} WHERE status = 1`,
  );
  return result;
};
module.exports = { createOrder, getAllOrders };
