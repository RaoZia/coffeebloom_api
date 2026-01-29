const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  getCatById,
  DeleteCatById,
} = require("../controllers/catagoriesController");

router.post("/add", addCategory);
router.get("/all", getAllCategories);
router.get("/:id", getCatById);
router.delete("/:id", DeleteCatById);
module.exports = router;
