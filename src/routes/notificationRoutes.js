const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const { addNotification } = require("../controllers/notificationController");

// router.post("/send", protected, addNotification);
module.exports = router;
