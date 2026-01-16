const nodemailer = require("nodemailer");

const submitContactForm = async (req, res) => {
  console.log("📩 Contact API HIT:", req.body);

  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    /* =====================
       ADMIN EMAIL
    ===================== */
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Form Submission",
      text: `
New Contact Lead

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject}

Message:
${message}
`,
    });

    /* =====================
       USER CONFIRMATION
    ===================== */
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "We received your message",
      text: `Hi ${name},

Thank you for contacting us.
Our team will get back to you shortly.

— Metric Team`,
    });

    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("❌ Contact Controller Error:", error);
    res.status(500).json({ message: "Email failed to send" });
  }
};

module.exports = { submitContactForm };
