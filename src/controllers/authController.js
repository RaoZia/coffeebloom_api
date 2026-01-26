const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { success, error } = require("../constants/messages");
const TABLE_NAMES = require("../constants/tableNames");
const authService = require("../services/authServices");
const response = require("../constants/responses");
const jwtutils = require("../utils/token");

// // ########################### SignUp api ##############################
// const Register = async (req, res) => {
//   const { user_name, user_email, password } = req.body;
//   // ########################### Check if user is already registered ##############################
//   const [user] = await db.execute(
//     `SELECT * FROM ${TABLE_NAMES.USERS} WHERE  user_email= ? AND status=1`,
//     [user_email],
//   );
//   if (user.length > 0) {
//     return res.status(400).json(response.errorRes(error.EMAIL_EXIST));
//   }

//   // ########################### Store user password in hashs ##############################
//   const hashedPassword = await bcrypt.hash(password, 10);
//   // ########################### Insert user details in db table ##############################
//   const [result] = await db.execute(
//     `INSERT INTO ${TABLE_NAMES.USERS} (user_name, user_email, password) VALUES (?, ?, ?)`,
//     [user_name, user_email, hashedPassword],
//   );

//   return res.status(200).json(response.successRes(success.USER_REGISTER));
// };

// // ########################### Login api ##############################
// const Login = async (req, res) => {
//   const { user_email, password } = req.body;
//   // ########################### Check if user is registered or not ##############################
//   const [user] = await db.execute(
//     `SELECT * FROM ${TABLE_NAMES.USERS} WHERE user_email=? AND status=1`,
//     [user_email],
//   );

//   if (user.length === 0) {
//     return res.status(404).json(response.errorRes(error.USER_NOT_FOUND));
//   }

//   const result = user[0];
//   // ########################### Compare user's password and password store in db ##############################
//   const isMatched = await bcrypt.compare(password, result.password);

//   if (!isMatched) {
//     res.status(400).json(response.errorRes(error.INVALID_USERNAME));
//   }
//   // ########################### Assign Token to the user on login success ##############################
//   const token = jwt.sign(
//     { id: result.id, user_email: result.user_email },
//     process.env.JWT_SECRET,
//   );

//   return res.status(200).json(response.successRes(success.USER_LOGIN, token));
// };

// module.exports = { Register, Login };
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
