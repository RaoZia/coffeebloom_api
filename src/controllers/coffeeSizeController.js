const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const coffeeSizeServices = require("../services/coffeeSizeServices");

// ########################### Add coffees ##############################
const addCoffeeSize = async (req, res) => {
  try {
    const result = await coffeeSizeServices.addCoffeeSize(req.body);
    return res
      .status(200)
      .json(response.successRes(200, success.COFFEE_ADDED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err));
  }
};

const getAllSizes = async (req, res) => {
  try {
    const result = await coffeeSizeServices.getAllSizes();
    return res
      .status(200)
      .json(response.successRes(200, success.COFFEE_ADDED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err));
  }
};

module.exports = { addCoffeeSize, getAllSizes };
