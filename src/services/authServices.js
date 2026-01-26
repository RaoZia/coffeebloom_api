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
  // const token = jwt.sign(
  //   { id: user.id, email: user.email },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "1h" },
  // );
  // const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
  //   expiresIn: "1h",
  // });
  // const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
  //   expiresIn: "1h",
  // });

  const accessToken = jwtutils.generateAccessToken(user.id);
  const refreshToken = jwtutils.generateRefreshToken(user.id);
  return {
    message: success.USER_LOGIN,
    accessToken,
    refreshToken,
  };
};

// ########################### Function to getAllUsers ##############################
// const getAllUsers = async () => {
//   const [rows] = await db.execute(
//     `SELECT
//       u.id,
//       u.email,
//       ud.name,
//       ud.address
//     FROM ${TABLE_NAMES.USERS} u
//     LEFT JOIN ${TABLE_NAMES.USERS_DETAILS} ud
//       ON u.id = ud.user_id
//     WHERE u.status = 1
//     `,
//   );

//   return rows;
// };
module.exports = {
  signup,
  login,
  // getAllUsers,
};
