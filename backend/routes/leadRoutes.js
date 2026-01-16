const express = require("express");
const router = express.Router();
const { createLead } = require("../controllers/leadController");

console.log("🔥 leadRoutes loaded");

/* GET Leads */
router.get("/leads", async (req, res) => {
  res.json([]);
});

/* ✅ REAL LOGIC CO NNECTED */
router.post("/leads", createLead);

/* GET Lead Requests */
router.get("/lead-requests", async (req, res) => {
  res.json([]);
});

module.exports = router;
