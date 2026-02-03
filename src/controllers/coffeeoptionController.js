const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const coffeeoptionServices = require("../services/coffeeOptionServices");

// ########################### Get All Milk Options  ##############################
const getAllOptions = async (req, res) => {
  try {
    const result = await coffeeoptionServices.getAllOptions();
    return res
      .status(200)
      .json(response.successRes(200, success.ALL_COFFEES, result));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, error.RECORD_NOT_FOUND));
  }
};
// ########################### Get Single Milk Option by ID  ##############################
const getOptionById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await coffeeoptionServices.getOptionById(id);
    return res
      .status(200)
      .json(response.successRes(200, success.ALL_COFFEES, result));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, error.RECORD_NOT_FOUND));
  }
};
module.exports = { getAllOptions, getOptionById };
