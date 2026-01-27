const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { success, error } = require("../constants/messages");
const authService = require("../services/authServices");
const response = require("../constants/responses");
const jwtutils = require("../utils/token");

// ########################### SignUp api ##############################
const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(response.successRes(201, result.message, result.user));
  } catch (error) {
    res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### Login api ##############################
const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(
      response.successRes(200, result.message, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }),
    );
  } catch (err) {
    res.status(401).json(response.errorRes(401, error.message));
  }
};

// ########################### Get all users ##############################
// const getAllUsers = async (req, res) => {
//   try {
//     const user = await authService.getAllUsers();
//     res.status(200).json(response.successRes(200, success.ALL_USERS, user));
//   } catch (error) {
//     res.status(401).json(response.errorRes(401, error.message));
//   }
// };

const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res
        .status(401)
        .json(response.errorRes(401, error.REFRESH_TOKEN_MISSING));
    }
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
    const newAccessToken = jwtutils.generateAccessToken(decoded.userId);
    console.log(newAccessToken);
    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res
      .status(400)
      .json(response.errorRes(400, error.INVALID_REFRESH_TOKEN));
  }
};
module.exports = {
  signup,
  login,
  // getAllUsers,
  refreshToken,
};
