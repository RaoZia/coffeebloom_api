const { success, error } = require("../constants/messages");
const response = require("../constants/responses");
const notificationService = require("../services/notificationServices");

const addNotification = async (req, res) => {
  const userId = req.user.id;
  const { title, message } = req.body;
  const result = await notificationService.addNotification(
    userId,
    title,
    message,
  );
  return res
    .status(200)
    .json(response.successRes(200, success.NOTIFICATION_SEND));
};
module.exports = { addNotification };
