const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const coffeeServices = require("../services/coffeeServices");

// ########################### Add coffees ##############################
const addCoffee = async (req, res) => {
  try {
    const result = await coffeeServices.addCoffee(req.body);
    return res
      .status(200)
      .json(response.successRes(200, success.COFFEE_ADDED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err));
  }
};
// ########################### Get all coffees ##############################
const getAllCoffees = async (req, res) => {
  try {
    const result = await coffeeServices.getAllCoffees();
    return res
      .status(200)
      .json(response.successRes(200, success.ALL_COFFEES, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### Get coffeeById ##############################
const getCoffeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await coffeeServices.getCoffeeById(id);
    return res
      .status(200)
      .json(response.successRes(200, success.ALL_COFFEES, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### Update coffeeById ##############################
const updateCoffeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await coffeeServices.updateCoffeeById(id, data);
    console.log("result is", result);
    return res
      .status(200)
      .json(response.successRes(200, success.ALL_COFFEES, result));
  } catch (err) {
    return res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### Get coffeeById ##############################
const DeleteCoffeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await coffeeServices.DeleteCoffeeById(id);
    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json(response.errorRes(400, error.RECORD_NOT_FOUND));
    } else {
      return res
        .status(200)
        .json(response.successRes(200, success.DELETE_COFFEE));
    }
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
module.exports = {
  addCoffee,
  getAllCoffees,
  getCoffeeById,
  updateCoffeeById,
  DeleteCoffeeById,
};
