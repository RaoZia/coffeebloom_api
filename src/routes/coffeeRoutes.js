const express = require("express");
const router = express.Router();

const { addCoffee } = require("../controllers/coffeesController");
router.post("/add", addCoffee);

module.exports = router;
