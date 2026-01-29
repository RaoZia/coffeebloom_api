const express = require("express");
const router = express.Router();

const {
  addCoffee,
  getAllCoffees,
  getCoffeeById,
  updateCoffeeById,
  DeleteCoffeeById,
} = require("../controllers/coffeesController");
router.post("/add", addCoffee);
router.get("/allcoffee", getAllCoffees);
router.get("/:id", getCoffeeById);
router.put("/:id", updateCoffeeById);
router.delete("/:id", DeleteCoffeeById);

module.exports = router;
