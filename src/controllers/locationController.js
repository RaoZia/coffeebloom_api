const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const locationServices = require("../services/locationServices");

const addLocation = async (req, res) => {
  try {
    const { delivery_id, current_lat, current_lng } = req.body;

    const result = await locationServices.addLocation(
      delivery_id,
      current_lat,
      current_lng,
    );
    return res
      .status(200)
      .json(response.successRes(200, success.LOCATION_ADDED));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, err.message));
  }
};

const getLocation = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const result = await locationServices.getLocation(deliveryId);
    return res
      .status(200)
      .json(response.successRes(200, success.LATEST_LOCATION, result));
  } catch (err) {
    return res.status(400).json(response.errorRes(400, err.message));
  }
};
module.exports = { addLocation, getLocation };
