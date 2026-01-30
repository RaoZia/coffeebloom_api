const express = require("express");
const router = express.Router();

const {
  addCoffeeSize,
  getAllSizes,
} = require("../controllers/coffeeSizeController");
const protected = require("../middlewares/authMiddleware");

// router.post("/add", addCoffeeSize);
router.get(
  "/all",
  protected,
  /*
    #swagger.tags = ['Coffee Sizes']
    #swagger.summary = 'Get all coffees sizes'
    #swagger.description = 'Fetch all active coffee sizes'

    #swagger.responses[200] = {
      description: 'Coffee sizes fetched successfully'
    }
  */

  getAllSizes,
);
module.exports = router;
