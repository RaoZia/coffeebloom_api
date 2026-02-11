const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");

// ########################### Create New ORDER ##############################
const createOrder = async (
  userId,
  total_amount,
  items,
  delivery_address,
  lat,
  lng,
) => {
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

  await db.execute(
    `INSERT INTO ${TABLE_NAMES.DELIVERIES} (order_id, delivery_address,delivery_lat, delivery_lng) VALUES (?,?,?,?)`,
    [orderId, delivery_address, lat, lng],
  );
};
// ########################### Get ALL ORDERS ##############################
const getAllOrders = async (id) => {
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.ORDERS} WHERE user_id =? AND status = 0`,
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
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total_amount * 100),
    currency: "usd",
    metadata: {
      order_id: order_id,
    },
  });
  // console.log("paymentIntent id is", paymentIntent.id);
  // console.log("client key:", paymentIntent.client_secret);
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

module.exports = { createOrder, getAllOrders, orderPayment };
