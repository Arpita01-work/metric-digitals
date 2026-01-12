const db = require("../config/firebaseAdmin");
const sgMail = require("../config/sendgrid");

exports.createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      serviceInterest,
      message,
      consent,
      utm_source,
      utm_medium,
      utm_campaign,
    } = req.body;

    /* ===============================
       1️⃣ BASIC VALIDATION
    =============================== */
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    if (!consent) {
      return res.status(400).json({ error: "User consent is required" });
    }

    const emailNormalized = email.trim().toLowerCase();

    /* ===============================
       2️⃣ CHECK FOR EXISTING LEAD
    =============================== */
    const leadQuery = await db
      .collection("leads")
      .where("email_normalized", "==", emailNormalized)
      .limit(1)
      .get();

    let isNewLead = false;
    let leadRef;

    if (leadQuery.empty) {
      // 🔹 FIRST TIME LEAD (NEW PERSON)
      isNewLead = true;

      leadRef = await db.collection("leads").add({
        name,
        email,
        email_normalized: emailNormalized,
        phone: phone || "",

        consent_given: true,
        consent_timestamp: new Date(),
        consent_ip: req.ip,

        status: "new",
        touchCount: 1,
        firstCreatedAt: new Date(),
        lastTouchedAt: new Date(),
      });

      console.log("✅ New lead created");
    } else {
      // 🔹 EXISTING PERSON
      leadRef = leadQuery.docs[0].ref;
      const existingData = leadQuery.docs[0].data();

      await leadRef.update({
        name,
        phone: phone || existingData.phone,
        touchCount: (existingData.touchCount || 1) + 1,
        lastTouchedAt: new Date(),
      });

      console.log("🔁 Existing lead updated");
    }

    /* ===============================
       3️⃣ ALWAYS STORE REQUEST HISTORY
       (THIS IS THE KEY CHANGE)
    =============================== */
    await db.collection("lead_requests").add({
      leadId: leadRef.id, // 🔗 LINK TO LEAD
      serviceInterest: serviceInterest || "",
      message: message || "",

      utm_source: utm_source || "direct",
      utm_medium: utm_medium || "none",
      utm_campaign: utm_campaign || "none",

      requestedAt: new Date(),
    });

    console.log("📝 Lead request stored");

    /* ===============================
       4️⃣ ADMIN EMAIL (ONLY ON FIRST TOUCH)
    =============================== */
    if (isNewLead) {
      try {
        await sgMail.send({
          to: process.env.ADMIN_EMAIL,
          from: process.env.FROM_EMAIL,
          subject: "📩 New Lead Received",
          text: `New lead from ${name} (${email})`,
          html: `
            <h3>New Lead Received</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone || "-"}</p>
            <p><b>First Service:</b> ${serviceInterest || "-"}</p>
            <p><b>Message:</b> ${message || "-"}</p>
          `,
        });

        console.log("✅ Admin email sent (first touch)");
      } catch (err) {
        console.error("❌ Admin email failed", err.response?.body || err);
      }
    }

    /* ===============================
       5️⃣ USER CONFIRMATION EMAIL (ALWAYS)
    =============================== */
    try {
      await sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "Thanks for contacting Matric Digitals",
        text: "Thanks for contacting Matric Digitals. Our team will reach out shortly.",
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for contacting <b>Matric Digitals</b>.</p>
          <p>We’ve received your request for <b>${serviceInterest}</b>.</p>
          <p>Our team will reach out shortly.</p>
          <br/>
          <p>Regards,<br/>Matric Digitals Team</p>
        `,
      });

      console.log("✅ User confirmation email sent");
    } catch (err) {
      console.error("❌ User email failed", err.response?.body || err);
    }

    /* ===============================
       6️⃣ FINAL RESPONSE
    =============================== */
    return res.status(201).json({
      message: isNewLead
        ? "Lead submitted successfully"
        : "We’ve received your new request. Our team will contact you soon.",
    });

  } catch (error) {
    console.error("🔥 UNEXPECTED ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
