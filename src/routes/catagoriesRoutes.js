const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  addCategory,
  getAllCategories,
  getCatById,
  updateCatById,
  DeleteCatById,
} = require("../controllers/catagoriesController");
const protected = require("../middlewares/authMiddleware");

// router.post("/add", upload.single("image"), addCategory);
router.get(
  "/",
  protected,
  /*
    #swagger.tags = ['Coffee Categories']
    #swagger.summary = 'Get all coffee categories'
    #swagger.description = 'Fetch all active coffee categories'

    #swagger.responses[200] = {
      description: 'Categories fetched successfully'
    }
  */
  getAllCategories,
);
router.get(
  "/:id",
  protected,
  /*
    #swagger.tags = ['Coffee Categories']
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
  getCatById,
);
// router.put("/:id", updateCatById);
// router.delete("/:id", DeleteCatById);
module.exports = router;
