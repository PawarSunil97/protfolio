const express = require("express");
const router = express.Router();
const { sendSms, handleIncomingSms } = require("../controllers/smsController");

// Frontend sends SMS
router.post("/send", sendSms);

// Twilio webhook
router.post("/webhook", handleIncomingSms);

module.exports = router;
