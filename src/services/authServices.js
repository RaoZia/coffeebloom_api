const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const db = require("../config/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const jwtutils = require("../utils/token");

// ########################### Signup Query ##############################
const signup = async ({ name, email, password, confirm_password, address }) => {
  const [existingUser] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email=? AND status = 1`,
    [email],
  );
  // ########################### Check Existing Email ##############################
  if (existingUser.length > 0) {
    throw new Error(error.EMAIL_EXIST);
  }
  // const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  // if (!passwordRegex.test(password)) {
  //   throw new Error(error.PASSWORD_MUST);
  // }

  if (password !== confirm_password) {
    throw new Error(error.PASSWORD_MISMATCH);
  }

  // ########################### Convert passwerd into hashed password ##############################
  const hashedPassword = await bcrypt.hash(password, 10);

  // ########################### Insert data into tbl_users table ##############################
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.USERS}  (  email, password_hash) VALUES (?, ?)`,
    [email, hashedPassword],
  );

  // ########################### Insert data into tbl_users_details ##############################
  const user_id = result.insertId;
  const [user_detail] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.USERS_DETAILS}  (user_id, name, address) VALUES (?, ?, ?)`,
    [user_id, name, address],
  );
  // ########################### Assign JWT token on Signup ##############################
  // const token = jwt.sign(
  //   { id: result.id, email: result.email },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "1h" },
  // );

  return {
    message: success.USER_REGISTER,
    user: {
      id: result.insertId,
      name: name,
      email: email,
      address: address,
      // token: token,
    },
  };
};
// ########################### Login Api Service ##############################
const login = async ({ email, password }) => {
  const [user] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email = ? AND status=1`,
    [email],
  );
  // ########################### Check if email is not registered ##############################
  if (user.length === 0) {
    throw new Error(error.INVALID_CREDENTIALS);
  }

  const rows = user[0];
  const isMatch = await bcrypt.compare(password, rows.password_hash);
  if (!isMatch) {
    throw new Error(error.INVALID_USERNAME);
  }

  // ########################### Assign token on login ##############################

  const accessToken = jwtutils.generateAccessToken(user.id);
  const refreshToken = jwtutils.generateRefreshToken(user.id);
  return {
    message: success.USER_LOGIN,
    accessToken,
    refreshToken,
  };
};
// ########################### Forgot Password ##############################
const forgotPassword = async ({ email }) => {
  const [result] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email = ? AND status = 1`,
    [email],
  );
  if (result.length === 0) {
    throw new Error(error.USER_NOT_FOUND);
  }
  return result;
};
// ########################### Handle Password ##############################
const handleOtp = async ({ email, otp }) => {
  // const expiresAt = new Date(Date.now() + 1 * 60 * 1000);
  // const expiresAt = new Date();
  // expiresAt.setMinutes(expiresAt.getMinutes() + 1);
  const [exist] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.PASSWORD_RESETS} WHERE email = ? AND status = 1`,
    [email],
  );
  if (exist.length > 0) {
    await db.execute(
      `UPDATE ${TABLE_NAMES.PASSWORD_RESETS} SET otp = ?, expires_at= DATE_ADD(NOW(), INTERVAL 1 MINUTE) WHERE email = ? AND status=1`,
      [otp, email],
    );
  } else {
    await db.execute(
      `INSERT INTO ${TABLE_NAMES.PASSWORD_RESETS} (email, otp, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 MINUTE))`,
      [email, otp],
    );
  }
};
// ########################### Reset Password ##############################
const resetPass = async (email, otp, password) => {
  console.log("email is ", email, otp, password);
  const [result] = await db.execute(
    `SELECT email 
     FROM ${TABLE_NAMES.PASSWORD_RESETS} 
     WHERE email = ? 
       AND otp = ? 
       AND status = 1
       AND expires_at > NOW()`,
    [email, otp],
  );
  if (result.length === 0) {
    throw new Error(error.INVALID_OTP);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.execute(
    `UPDATE ${TABLE_NAMES.USERS} SET password_hash = ? WHERE email = ? AND status =1`,
    [hashedPassword, email],
  );
};
module.exports = {
  signup,
  login,
  forgotPassword,
  handleOtp,
  resetPass,
};
