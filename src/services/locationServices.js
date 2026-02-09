const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

const addLocation = async (orderId, current_lat, current_lng) => {
  if (!orderId || !current_lat || !current_lng) {
    throw new Error(error.ALL_FIELDS);
  }
  await db.execute(
    `INSERT INTO ${TABLE_NAMES.DELIVERY_LOCATION} (order_id, current_lat, current_lng) VALUES (?,?,?)`,
    [orderId, current_lat, current_lng],
  );
};

const getLocation = async (orderId) => {
  const [result] = await db.execute(
    `SELECT current_lat, current_lng FROM ${TABLE_NAMES.DELIVERY_LOCATION} WHERE order_id = ?`,
    [orderId],
  );
  if (result.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return result;
};

module.exports = { addLocation, getLocation };
