const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const ordersServices = require("../services/ordersServices");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.ENDPOINT_SECRET;

// ########################### Create New ORDER ##############################
const createOrder = async (req, res) => {
  try {
    const { total_amount, items, delivery_address, lat, lng } = req.body;
    const userId = req.user.id;
    const result = await ordersServices.createOrder(
      userId,
      total_amount,
      items,
      delivery_address,
      lat,
      lng,
    );
    return res
      .status(200)
      .json(response.successRes(200, success.CREATE_ORDER, result));
  } catch (err) {
    console.log(err);
    return res.status(400).json(400, err.message);
  }
};

// ########################### Get ALL ORDERS ##############################
const getAllOrders = async (req, res) => {
  const result = await ordersServices.getAllOrders(req.user.id);
  return res
    .status(200)
    .json(response.successRes(200, success.ALL_ORDERS, result));
};

// ########################### Create Payments ##############################
const orderPayment = async (req, res) => {
  try {
    const { order_id, payment_method_id } = req.body;
    const result = await ordersServices.orderPayment(
      order_id,
      payment_method_id,
    );

    return res
      .status(200)
      .json(response.successRes(200, success.PAYMENT_COMPLETE, result));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, err.message));
  }
};

const webHook = async (req, res) => {
  let event = req.body;
  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400);
    }
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.send();
};

module.exports = { createOrder, getAllOrders, orderPayment, webHook };
