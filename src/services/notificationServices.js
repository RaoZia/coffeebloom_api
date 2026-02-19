const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

const addNotification = async (userId, title, message) => {
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.NOTIFICATIONS} (user_id,title, message) values (?,?,?)`,
    [userId, title, message],
  );
  return result;
};
module.exports = { addNotification };
