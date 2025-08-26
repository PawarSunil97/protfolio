const { sendSmsToAdmin } = require("../services/twilioService");

// Frontend → send SMS to admin
exports.sendSms = async (req, res) => {
  const { body } = req.body;
  if (!body) return res.status(400).json({ error: "Missing message body" });

  try {
    await sendSmsToAdmin(body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Twilio webhook → admin replies
exports.handleIncomingSms = (req, res) => {
  const from = req.body.From; // admin number
  const to = req.body.To;     // user’s phone number
  const body = req.body.Body; // admin reply text

  console.log("Incoming SMS:", { from, to, body });

  // Find the socket for this user
  const user = Object.values(global.userMap).find(u => u.phone === to);

  if (user && user.socket) {
    user.socket.emit("sms-reply", { body, from });
    console.log("Delivered reply to user:", to);
  } else {
    console.log("No connected user found for:", to);
  }

  // Twilio expects XML
  res.type("text/xml").send("<Response></Response>");
};
