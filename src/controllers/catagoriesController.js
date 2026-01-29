const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const catagoryServices = require("../services/catagoriesServices");
// ########################### Add catagory ##############################
const addCategory = async (req, res) => {
  try {
    const result = await catagoryServices.addCategory(req.body);
    res.status(201).json(response.successRes(201, "Category added", result));
  } catch (err) {
    res.status(400).json(response.errorRes(400, err.message));
  }
};
// ########################### Get all catagory ##############################
const getAllCategories = async (req, res) => {
  try {
    const data = await catagoryServices.getAllCategories();
    res.status(200).json(response.successRes(200, "Categories fetched", data));
  } catch (err) {
    res.status(400).json(response.errorRes(400, err.message));
  }
};

const getCatById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await catagoryServices.getCatById(id);
    return res
      .status(200)
      .json(response.successRes(200, success.ALL_COFFEES, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};

// ########################### Get coffeeById ##############################
const DeleteCatById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await catagoryServices.DeleteCatById(id);
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
  addCategory,
  getAllCategories,
  getCatById,
  DeleteCatById,
};
