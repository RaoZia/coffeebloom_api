const express = require("express");
const router = express.Router();

const {
  addCoffeeSize,
  getAllSizes,
  getSizeByID,
} = require("../controllers/coffeeSizeController");
const protected = require("../middlewares/authMiddleware");

// router.post("/add", addCoffeeSize);
router.get(
  "/",
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
router.get(
  "/:id",
  protected,
  /*
    #swagger.tags = ['Coffee Sizes']
    #swagger.summary = 'Get single coffee size'
    #swagger.description = 'Fetch single active coffee size'

    #swagger.responses[200] = {
      description: 'Coffee size fetched successfully'
    }
  */
  getSizeByID,
);
module.exports = router;
