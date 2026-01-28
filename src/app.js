require("dotenv").config();
const express = require("express");
const { success, error } = require("./constants/messages");
const response = require("./constants/responses");
const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use((req, res) => {
  return res.status(404).json(response.errorRes(error.PAGE_NOT_FOUND));
});

module.exports = app;

// const saveOTP = async (id, otp, expiry) => {
//   await db.execute(
//     `INSERT INTO tbl_password_resets (user_id, otp, expires_at)
//      VALUES (?, ?, ?)`,
//     [id, otp, expiry],
//   );
// };
