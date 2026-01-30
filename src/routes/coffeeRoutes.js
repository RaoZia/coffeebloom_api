const express = require("express");
const router = express.Router();

const {
  addCoffee,
  getAllCoffees,
  getCoffeeById,
  updateCoffeeById,
  DeleteCoffeeById,
} = require("../controllers/coffeesController");
const protected = require("../middlewares/authMiddleware");
// router.post("/add", addCoffee);
router.get(
  "/all",
  protected,
  /*
    #swagger.tags = ['Coffees']
    #swagger.summary = 'Get all coffees'
    #swagger.description = 'Fetch all active coffees'

    #swagger.responses[200] = {
      description: 'Coffees fetched successfully'
    }
  */
  getAllCoffees,
);
router.get(
  "/:id",
  protected,
  /*
    #swagger.tags = ['Coffees']
    #swagger.summary = 'Get coffee By ID'
    #swagger.description = 'Get coffee details'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer'
    }
    
    #swagger.responses[200] = {
      description: 'Coffee Fetched successfully'
    }
    */
  getCoffeeById,
);
// router.put("/:id", updateCoffeeById);
// router.delete("/:id", DeleteCoffeeById);

module.exports = router;
