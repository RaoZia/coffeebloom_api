const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

// ########################### Add Coffee ##############################
const addCoffee = async (data, imagePath) => {
  const { coffee_name, coffee_description, coffee_price, coffee_catagory_id } =
    data;

  // ########################### Query to insert image in tbl_imgs ##############################
  // const [storeImg] = await db.execute(
  //   `INSERT INTO ${TABLE_NAMES.IMAGES} (image_url) VALUES (?)`,
  //   [imagePath],
  // );
  // const ImgId = storeImg.insertId;
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.COFFEES}( coffee_name,coffee_description, coffee_price,coffee_catagory_id)
     VALUES ( ?, ?, ?,?)`,
    [coffee_name, coffee_description, coffee_price, coffee_catagory_id],
  );
  const coffeeId = result.insertId;
  await db.execute(
    `INSERT INTO ${TABLE_NAMES.IMAGES} (foreign_type, foreign_id,image_url) VALUES (?,?,?)`,
    [2, coffeeId, imagePath],
  );
  const [rows] = await db.execute(
    `SELECT c.coffee_id,c.coffee_name, i.image_url, c.coffee_description,c.coffee_price,c.rating,c.status,
    c1.coffee_catagory_id,c1.coffee_catagory_name FROM ${TABLE_NAMES.COFFEES} c
    LEFT JOIN ${TABLE_NAMES.COFFEE_CATAGORY} c1
    ON c1.coffee_catagory_id = c.coffee_catagory_id
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON c.coffee_id = i.foreign_id
    WHERE c.coffee_id = ? AND c.status = 1`,
    [coffeeId],
  );
  return rows;
};
// ########################### Get all coffees ##############################
const getAllCoffees = async () => {
  const [result] = await db.execute(
    `SELECT c.coffee_id,c.coffee_name,i.image_url, c.coffee_description,c.coffee_price,c.rating,c.status,
    c1.coffee_catagory_id,c1.coffee_catagory_name FROM ${TABLE_NAMES.COFFEES} c
    LEFT JOIN ${TABLE_NAMES.COFFEE_CATAGORY} c1
    ON c1.coffee_catagory_id = c.coffee_catagory_id 
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON c.coffee_id = i.foreign_id AND i.foreign_type = 2
    WHERE c.status = 1`,
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
    `SELECT c.coffee_id,c.coffee_name,i.image_url, c.coffee_description,c.coffee_price,c.rating,c.status,
    c1.coffee_catagory_id,c1.coffee_catagory_name FROM ${TABLE_NAMES.COFFEES} c
    LEFT JOIN ${TABLE_NAMES.COFFEE_CATAGORY} c1
    ON c1.coffee_catagory_id = c.coffee_catagory_id 
    LEFT JOIN ${TABLE_NAMES.IMAGES} i ON c.coffee_id = i.foreign_id AND i.foreign_type = 2
    WHERE c.coffee_id = ?
    AND c.status = 1`,
    [id],
  );
  return result;
};
// ########################### Get coffee By Catagory ID##############################
const getCoffeeByCatId = async (id) => {
  const [existingUser] = await db.execute(
    `SELECT coffee_catagory_id FROM ${TABLE_NAMES.COFFEE_CATAGORY} WHERE coffee_catagory_id = ? AND status = 1`,
    [id],
  );
  if (existingUser.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  const [result] = await db.execute(
    `SELECT c.coffee_id,c.coffee_name,c.coffee_description,c.coffee_price,c.rating,c.status, 
    ct.coffee_catagory_id, ct.coffee_catagory_name,i.image_url 
    FROM ${TABLE_NAMES.COFFEES} c 
    LEFT JOIN ${TABLE_NAMES.COFFEE_CATAGORY} ct 
    ON ct.coffee_catagory_id = c.coffee_catagory_id
    LEFT JOIN ${TABLE_NAMES.IMAGES} i 
    ON i.foreign_id = c.coffee_id AND i.foreign_type = 2
     WHERE ct.coffee_catagory_id = ? AND c.status = 1`,
    [id],
  );
  return result;
};
// ########################### Update coffeeByID##############################
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
    `UPDATE ${TABLE_NAMES.COFFEES} SET coffee_name = ?, coffee_description = ?, coffee_price = ?  WHERE coffee_id =?`,
    [coffee_name, coffee_description, coffee_price, id],
  );

  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.COFFEES} WHERE coffee_id = ? AND status = 1`,
    [id],
  );
  return result;
};
// ########################### Delete coffeeByID##############################
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
  getCoffeeByCatId,
  updateCoffeeById,
  DeleteCoffeeById,
};
