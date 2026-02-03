const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const ordersServices = require("../services/ordersServices");

const createOrder = async (req, res) => {
  try {
    // console.log("user req:", req.user.id);
    const { total_amount } = req.body;
    const userId = req.user.id;
    const result = await ordersServices.createOrder(userId, total_amount);
    return res
      .status(200)
      .json(response.successRes(200, success.COFFEE_ADDED, result));
  } catch (err) {
    console.log(err);
    return res.status(400).json(400, error.message);
  }
};

module.exports = { createOrder };
