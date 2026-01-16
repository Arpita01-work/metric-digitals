const db = require("../config/firebaseAdmin");

/* ===============================
   GET LEADS (MATCH DASHBOARD)
================================ */
exports.getLeads = async (req, res) => {
  try {
    const snapshot = await db
      .collection("leads")
      .orderBy("firstCreatedAt", "desc")
      .get();

    const leads = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        status: data.status || "new",
        lead_source: data.utm_source || "Direct",
        created_date: data.firstCreatedAt
          ? data.firstCreatedAt.toDate().toISOString()
          : null,
      };
    });

    res.json(leads);
  } catch (err) {
    console.error("Admin getLeads error:", err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

/* ===============================
   GET LEAD REQUESTS (MATCH DASHBOARD)
================================ */
exports.getLeadRequests = async (req, res) => {
  try {
    const snapshot = await db
      .collection("lead_requests")
      .orderBy("requestedAt", "desc")
      .get();

    const requests = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();

      // 🔗 fetch lead name using leadId
      let leadName = "Unknown";
      if (data.leadId) {
        const leadDoc = await db.collection("leads").doc(data.leadId).get();
        if (leadDoc.exists) {
          leadName = leadDoc.data().name;
        }
      }

      requests.push({
        id: doc.id,
        lead_name: leadName,
        service: data.serviceInterest || "Other",
        created_date: data.requestedAt.toDate().toISOString(),
      });
    }

    res.json(requests);
  } catch (err) {
    console.error("Admin getLeadRequests error:", err);
    res.status(500).json({ error: "Failed to fetch lead requests" });
  }
};
