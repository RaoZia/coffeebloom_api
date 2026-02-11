const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const {
  addLocation,
  getLocation,
} = require("../controllers/locationController");
router.post("/add", protected, addLocation);
router.get("/:deliveryId", protected, getLocation);
module.exports = router;
