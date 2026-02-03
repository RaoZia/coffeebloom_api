const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/ordersController");
const protected = require("../middlewares/authMiddleware");
// router.post("/create", protected, createOrder);

module.exports = router;
