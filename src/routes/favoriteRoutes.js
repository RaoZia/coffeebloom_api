const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const {
  addFavorite,
  removeFavorite,
  getAllFavorites,
} = require("../controllers/favoriteController");
router.post(
  "/add",
  protected,
  /*
    #swagger.tags = ['Favorites']
    #swagger.summary = 'Add coffee to favorites'
    #swagger.description = 'Add a coffee to favorites'
    */
  addFavorite,
);
router.delete(
  "/remove",
  protected,
  /*
    #swagger.tags = ['Favorites']
    #swagger.summary = 'Remove coffee from favorites'
    #swagger.description = 'Remove coffee favorites'
  */
  removeFavorite,
);
router.get(
  "/",
  protected,
  /*
    #swagger.tags = ['Favorites']
    #swagger.summary = 'List of coffee from favorites'
    #swagger.description = 'List of coffees favorites'
  */
  getAllFavorites,
);
module.exports = router;
