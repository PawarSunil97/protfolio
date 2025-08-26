require("dotenv").config();

module.exports = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilioNumber: process.env.TWILIO_PHONE_NUMBER,
  adminPhone: process.env.ADMIN_PHONE,
};
