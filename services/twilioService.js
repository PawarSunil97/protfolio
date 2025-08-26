const twilio = require("twilio");
const { accountSid, authToken, twilioNumber, adminPhone } = require("../config/twilioConfig");

const client = twilio(accountSid, authToken);

// Send SMS from user → admin
exports.sendSmsToAdmin = async (message) => {
  try {
    await client.messages.create({
      from: twilioNumber,
      to: adminPhone,
      body: message,
    });
    console.log("Message sent to admin:", message);
  } catch (err) {
    console.error("Error sending SMS:", err);
    throw err;
  }
};
