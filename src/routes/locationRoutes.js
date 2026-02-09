const express = require("express");
const router = express.Router();
const {
  addLocation,
  getLocation,
} = require("../controllers/locationController");
// router.post("/add", addLocation);
// router.get("/:orderId", getLocation);
module.exports = router;
