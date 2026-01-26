const usersServices = require("../services/usersServices");
const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
// ########################### Get Single User ##############################
const getSingleuser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await usersServices.getSingleuser(id);
    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_USER, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, error.INVALID_USER_ID));
  }
};

// ########################### Get all users ##############################
const getAllUsers = async (req, res) => {
  try {
    const user = await usersServices.getAllUsers();
    res.status(200).json(response.successRes(200, success.ALL_USERS, user));
  } catch (err) {
    res.status(401).json(response.errorRes(401, error.message));
  }
};

const updateById = async (req, res) => {
  // const id = req.params.id;
  // console.log("Updation user id is:", id);
  try {
    const id = req.params.id;
    const user = await usersServices.updateById(id, req.body);
    return res
      .status(200)
      .json(response.successRes(200, success.USER_UPDATED, user));
  } catch (err) {
    res.status(401).json(response.errorRes(401, error.INVALID_USER_ID));
  }
};

module.exports = {
  getSingleuser,
  getAllUsers,
  updateById,
};
