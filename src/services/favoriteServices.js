const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
// ########################### Add INTO favorites ##############################
const addFavorite = async (userid, coffee_id) => {
  const [result] = await db.execute(
    `SELECT id FROM ${TABLE_NAMES.FAVORITES} WHERE user_id = ? AND coffee_id =? AND status=1`,
    [userid, coffee_id],
  );

  if (result.length > 0) {
    throw new Error(error.ALREADY_IN_FAVORITES);
  }
  //   const [coffees] = await db.execute(
  //     `SELECT image_url FROM ${TABLE_NAMES.IMAGES} WHERE foreign_id = ? AND foreign_type = 3 AND status = 1`,
  //     [coffee_id],
  //   );
  //   const coffeeImg = coffees[0].image_url;
  await db.execute(`INSERT INTO `);
  const [result1] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.FAVORITES} (user_id, coffee_id) VALUES (?,?)`,
    [userid, coffee_id],
  );
  return result1;
};
// ########################### Remove Coffee from Favorites ##############################
const removeFavorite = async (userid, coffee_id) => {
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.FAVORITES} SET status = 0 WHERE user_id=? AND coffee_id = ? AND status = 1`,
    [userid, coffee_id],
  );
  if (result.affectedRows === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return result;
};
// ########################### Get List Of Favorites ##############################
const getAllFavorites = async (userid) => {
  const [result] = await db.execute(
    `SELECT f.user_id,f.coffee_id,c.coffee_name,c.coffee_description,c.coffee_price,c.rating,i.image_url
    FROM ${TABLE_NAMES.FAVORITES} f 
    JOIN ${TABLE_NAMES.COFFEES} c ON c.coffee_id = f.coffee_id
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON foreign_id = c.coffee_id 
    AND i.foreign_type = 2
    WHERE f.user_id = ? AND f.status = 1`,
    [userid],
  );
  if (result.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return result;
};
module.exports = { addFavorite, removeFavorite, getAllFavorites };
