const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

const addLocation = async (deliveryId, current_lat, current_lng) => {
  if (!deliveryId || !current_lat || !current_lng) {
    throw new Error(error.ALL_FIELDS);
  }
  const [curLocation] = await db.execute(
    `SELECT current_lat, current_lng FROM ${TABLE_NAMES.DELIVERY_LOCATION} WHERE delivery_id = ? ORDER BY created_at DESC
     LIMIT 1`,
    [deliveryId],
  );
  if (curLocation.length > 0) {
    const preLat = curLocation[0].current_lat;
    const preLng = curLocation[0].current_lng;
    if (preLat == current_lat && preLng == current_lng) {
      throw new Error(error.LOCATION_PRESENT);
    }
  }
  await db.execute(
    `INSERT INTO ${TABLE_NAMES.DELIVERY_LOCATION} (delivery_id, current_lat, current_lng) VALUES (?,?,?)`,
    [deliveryId, current_lat, current_lng],
  );
};

const getLocation = async (deliveryId) => {
  const [result] = await db.execute(
    `SELECT current_lat, current_lng FROM ${TABLE_NAMES.DELIVERY_LOCATION} WHERE delivery_id = ? ORDER BY created_at DESC
     LIMIT 1`,
    [deliveryId],
  );
  if (result.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return result;
};

module.exports = { addLocation, getLocation };
