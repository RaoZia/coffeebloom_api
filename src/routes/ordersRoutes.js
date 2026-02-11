const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  orderPayment,
  webHook,
} = require("../controllers/ordersController");
const protected = require("../middlewares/authMiddleware");
router.post(
  "/create",
  protected,
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Create Order'
    #swagger.description = 'Create Order'
  */
  createOrder,
);
router.get(
  "/",
  protected,
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'List of Orders'
    #swagger.description = 'List of orders'
  */
  getAllOrders,
);
router.post(
  "/pay",
  protected,
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Order payment success'
    #swagger.description = 'Order payment success'
  */
  orderPayment,
);

// router.post("/webhook", express.raw({ type: "application/json" }), webHook);
module.exports = router;
