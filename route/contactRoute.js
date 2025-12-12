require('dotenv').config();
const router = require("express").Router();
const nodemailer = require("nodemailer");

// Environment variables
const USER_EMAIL = process.env.USER_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;

// Validate environment variables
if (!USER_EMAIL || !APP_PASSWORD) {
  console.error("Missing USER_EMAIL or APP_PASSWORD in environment variables");
  console.error("For Railway: Add USER_EMAIL and APP_PASSWORD in the Variables tab");
  console.error("For local: Create a .env file with USER_EMAIL and APP_PASSWORD");
  process.exit(1);
}

// Nodemailer transporter using App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: APP_PASSWORD
  }
});

// Verify transporter configuration
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP transporter error:", err);
  } else {
    console.log("SMTP transporter ready");
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message, msg } = req.body;

    if (!name || !email || (!message && !msg)) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    const finalMessage = message || msg;

    const mailOptions = {
      from: `"${name}" <${USER_EMAIL}>`,
      replyTo: email,
      to: USER_EMAIL,
      subject: `Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Name:</strong> ${name}</li>
              <li style="margin: 10px 0;"><strong>Email:</strong> ${email}</li>
            </ul>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #555;">Message</h3>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${finalMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #888; font-size: 12px;">
            This message was sent from your website contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Thank you for contacting Sunil! Your message has been sent successfully." });

  } catch (error) {
    console.error("Error while sending email:", error);
    res.status(500).json({ msg: "There was an error sending your message. Please try again later." });
  }
});

module.exports = router;
