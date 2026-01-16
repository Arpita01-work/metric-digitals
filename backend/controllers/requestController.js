const db = require("../config/firebaseAdmin");

/**
 * GET /api/requests
 */
exports.getAllRequests = async (req, res) => {
  try {
    const snapshot = await db
      .collection("requests")
      .orderBy("created_date", "desc")
      .get();

    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(requests);
  } catch (error) {
    console.error("❌ Firestore fetch error:", error);
    res.status(500).json([]);
  }
};

/**
 * POST /api/requests
 */
exports.createRequest = async (req, res) => {
  try {
    const data = {
      ...req.body,
      created_date: new Date().toISOString(),
    };

    const docRef = await db.collection("requests").add(data);

    res.status(201).json({
      id: docRef.id,
      ...data,
    });
  } catch (error) {
    console.error("❌ Firestore create error:", error);
    res.status(500).json({
      message: "Failed to create request",
    });
  }
};
