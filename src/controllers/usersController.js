const usersServices = require("../services/usersServices");
const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
// ########################### Get all users ##############################
const getAllUsers = async (req, res) => {
  try {
    const user = await usersServices.getAllUsers();
    res.status(200).json(response.successRes(200, success.ALL_USERS, user));
  } catch (error) {
    res.status(401).json(response.errorRes(401, error.message));
  }
};

module.exports = {
  getAllUsers,
};
