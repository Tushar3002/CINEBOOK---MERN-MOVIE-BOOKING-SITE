const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter at startup
transporter.verify((error, success) => {
  if (error) {
    console.error(" Email transporter error:", error);
  } else {
    console.log(" Email transporter ready");
  }
});

async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: `"CineBook 🎬" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("📧 Email sent to:", to);
  } catch (err) {
    console.error("❌ Email send failed:", err);
    throw err;
  }
}

module.exports = sendEmail;
