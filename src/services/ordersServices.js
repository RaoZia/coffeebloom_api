const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ########################### Create New ORDER ##############################
const createOrder = async (userId, total_amount, items) => {
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.ORDERS} (user_id, total_amount) values (?,?)`,
    [userId, total_amount],
  );
  const orderId = result.insertId;
  // const ordersitems = items.map((item) => [
  //   orderId,
  //   item.coffee_id,
  //   item.size_id,
  //   item.milk_id,
  //   item.quantity,
  //   item.price,
  // ]);
  // await db.execute(
  //     `INSERT INTO ${TABLE_NAMES.ORDER_ITEM} (order_id,coffee_id,size_id,milk_id,quantity, price) VALUES (?,?,?,?,?,?)`,
  //     [
  //       ordersitems
  //     ],
  //   );
  for (const item of items) {
    await db.execute(
      `INSERT INTO ${TABLE_NAMES.ORDER_ITEM} (order_id,coffee_id,size_id,milk_id,quantity, price) VALUES (?,?,?,?,?,?)`,
      [
        orderId,
        item.coffee_id,
        item.size_id,
        item.milk_id,
        item.quantity,
        item.price,
      ],
    );
  }
};
// ########################### Get ALL ORDERS ##############################
const getAllOrders = async (id) => {
  // const [result] = await db.execute(
  //   `SELECT o.user_id,o.total_amount,i.coffee_id,i.size_id,i.milk_id,i.quantity,i.price FROM ${TABLE_NAMES.ORDERS} o
  //   LEFT JOIN ${TABLE_NAMES.ORDER_ITEM} i
  //   ON o.order_id = i.order_id
  //    WHERE o.user_id =?  AND o.status = 0 `,
  //   [id],
  // );
  const [result] = await db.execute(
    `SELECT o.user_id,o.total_amount,i.coffee_id,c.coffee_name,i.size_id,i.milk_id,i.quantity,i.price,im.image_url FROM ${TABLE_NAMES.ORDERS} o
    LEFT JOIN ${TABLE_NAMES.ORDER_ITEM} i
    ON o.order_id = i.order_id
    LEFT JOIN ${TABLE_NAMES.COFFEES} c 
    ON c.coffee_id = i.coffee_id
    LEFT JOIN ${TABLE_NAMES.IMAGES} im
    ON  im.foreign_id = i.coffee_id
    AND im.foreign_type = 2
     WHERE o.user_id =?  AND o.status = 0 `,
    [id],
  );
  return result;
};

const orderPayment = async (order_id, payment_method) => {
  const [amount] = await db.execute(
    `SELECT total_amount FROM ${TABLE_NAMES.ORDERS} WHERE order_id =? AND status = 0`,
    [order_id],
  );
  if (amount.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const total_amount = amount[0].total_amount;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total_amount * 100),
    currency: "usd",
    metadata: {
      order_id: order_id,
    },
  });

  await db.execute(
    `UPDATE ${TABLE_NAMES.ORDERS} SET status = 1 WHERE order_id = ?`,
    [order_id],
  );
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.PAYMENTS} (order_id, payment_method_id, amount,payment_intent_id,status)
     VALUES (?, ?, ?,?,1)`,
    [order_id, payment_method, total_amount, paymentIntent.id],
  );

  return {
    paymentIntentID: paymentIntent.id,
    client_secret: paymentIntent.client_secret,
  };
};
// ########################### Add Pickup Address ##############################
const pickupAddress = async (orderId, pick_up_address, lat, lng) => {
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.PICKUP_ADDRESS} (order_id, pickup_address, pickup_lat,  pickup_lng) VALUES (?,?,?,?)`,
    [orderId, pick_up_address, lat, lng],
  );
};
// ########################### Add Delivery Address ##############################
const deliverAddress = async (orderId, delivery_address, lat, lng) => {
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.DELIVERIES} (order_id, delivery_address,delivery_lat, delivery_lng) VALUES (?,?,?,?)`,
    [orderId, delivery_address, lat, lng],
  );
};

module.exports = {
  createOrder,
  getAllOrders,
  orderPayment,
  pickupAddress,
  deliverAddress,
};
