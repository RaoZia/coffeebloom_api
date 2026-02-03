const express = require("express");
const router = express.Router();
const {
  getAllOptions,
  getOptionById,
} = require("../controllers/coffeeoptionController");
const protected = require("../middlewares/authMiddleware");

router.get(
  "/",
  protected,
  /*
    #swagger.tags = ['Coffee Milk Options']
    #swagger.summary = 'Get all Milk Options'
    #swagger.description = 'Fetch all active coffee milk options'

    #swagger.responses[200] = {
      description: 'Coffee milk options fetched successfully'
    }
  */
  getAllOptions,
);
router.get(
  "/:id",
  protected,
  /*
    #swagger.tags = ['Coffee Milk Options']
    #swagger.summary = 'Get single milk option'
    #swagger.description = 'Fetch single active coffee milk option'

    #swagger.responses[200] = {
      description: 'Coffee milk option fetched successfully'
    }
  */
  getOptionById,
);

module.exports = router;
