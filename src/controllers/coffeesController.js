const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const coffeeServices = require("../services/coffeeServices");
const addCoffee = async (req, res) => {
  try {
    const result = await coffeeServices.addCoffee(req.body);
    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_USER, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err));
  }
};

module.exports = { addCoffee };
