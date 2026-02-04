const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
} = require("../controllers/ordersController");
const protected = require("../middlewares/authMiddleware");
// router.post("/create", protected, createOrder);
// router.get("/", getAllOrders);

module.exports = router;
