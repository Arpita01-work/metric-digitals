const nodemailer = require("nodemailer");

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    /* =====================
       ADMIN NOTIFICATION
    ===================== */
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "📰 New Newsletter Subscriber",
      text: `New subscriber email: ${email}`,
    });

    /* =====================
       USER CONFIRMATION
    ===================== */
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Thanks for subscribing!",
      text: `Hi 👋

Thanks for subscribing to our newsletter!
You’ll now receive updates, offers, and insights from us.

— Metric Team`,
    });

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error("❌ Newsletter Error:", error);
    res.status(500).json({ message: "Subscription failed" });
  }
};

module.exports = { subscribeNewsletter };
