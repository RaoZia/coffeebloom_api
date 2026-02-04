const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const ordersServices = require("../services/ordersServices");
// ########################### Create New ORDER ##############################
const createOrder = async (req, res) => {
  try {
    const { total_amount, items } = req.body;
    const userId = req.user.id;
    const result = await ordersServices.createOrder(
      userId,
      total_amount,
      items,
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
  const result = await ordersServices.getAllOrders();
  return res
    .status(200)
    .json(response.successRes(200, success.ALL_ORDERS, result));
};

module.exports = { createOrder, getAllOrders };
