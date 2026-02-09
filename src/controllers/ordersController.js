const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const ordersServices = require("../services/ordersServices");
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
    return res.status(400).json(400, error.message);
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
      .json(response.successRes(200, success.PAYMENT_COMPLETE));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

module.exports = { createOrder, getAllOrders, orderPayment };
