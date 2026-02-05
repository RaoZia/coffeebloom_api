const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const favoriteService = require("../services/favoriteServices");
// ########################### Add INTO Favorites ##############################
const addFavorite = async (req, res) => {
  try {
    const userid = req.user.id;
    const { coffee_id } = req.body;
    const result = await favoriteService.addFavorite(userid, coffee_id);
    return res
      .status(200)
      .json(response.successRes(200, success.FAVORITE_ADDED));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, err.message));
  }
};
// ########################### Remove Coffee From Favorites ##############################
const removeFavorite = async (req, res) => {
  try {
    const userid = req.user.id;
    const { coffee_id } = req.body;
    const result = await favoriteService.removeFavorite(userid, coffee_id);
    return res.status(200).json(response.successRes(success.FAVORITES_REMOVE));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, err.message));
  }
};
// ########################### Get List Of Favorites ##############################
const getAllFavorites = async (req, res) => {
  try {
    const userid = req.user.id;
    const result = await favoriteService.getAllFavorites(userid);
    return res
      .status(200)
      .json(response.successRes(200, success.FAVORITES_LIST, result));
  } catch (err) {
    return res.status(400).json(response.errorRes(err.message));
  }
};
module.exports = { addFavorite, removeFavorite, getAllFavorites };
