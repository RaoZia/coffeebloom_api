const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { success, error } = require("../constants/messages");
const authService = require("../services/authServices");
const response = require("../constants/responses");
const jwtutils = require("../utils/token");
const sendEmail = require("../config/sendEMail");
const randomInt = require("node:crypto");

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
// ########################### Forgot password api ##############################
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authService.forgotPassword({ email });

    const otp = Math.floor(100000 + Math.random() * 999999);
    // const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    // let otp = randomInt(1, 999999).toString().padStart(6, "0");
    await authService.handleOtp({ email, otp });
    const message = `Your otp is ${otp}`;
    await sendEmail(email, "Reset Password", message);
    res.status(200).json(response.successRes(200, success.EMAIL_SENT));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err));
  }
};
const resetPass = async (req, res) => {
  try {
    // console.log("is working");
    const { email, otp, password } = req.body;
    const user = await authService.resetPass(email, otp, password);
    res.status(200).json(response.successRes(200, success.PASSWORD_CHANGE));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
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
  forgotPassword,
  resetPass,
  refreshToken,
};
