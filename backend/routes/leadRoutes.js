const express = require("express");
const router = express.Router();

/* Leads */
router.get("/leads", async (req, res) => {
  // fetch leads from DB
  res.json([]);
});

/* Lead Requests */
router.get("/lead-requests", async (req, res) => {
  // fetch lead requests from DB
  res.json([]);
});

module.exports = router;
