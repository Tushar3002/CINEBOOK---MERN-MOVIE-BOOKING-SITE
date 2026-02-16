const express = require("express");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER, // send to yourself
      subject: "CineBook Email Test",
      html: "<h2>✅ Email system working!</h2><p>This is a test.</p>"
    });

    res.json({ message: "Test email sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
