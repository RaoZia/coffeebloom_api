const express = require("express");
const router = express.Router();
const { webHook } = require("../controllers/webhookController");
// router.post("/", express.raw({ type: "application/json" }), webHook);
module.exports = router;
