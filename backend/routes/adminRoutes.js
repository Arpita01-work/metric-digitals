const express = require("express");
const router = express.Router();
const {
  getLeads,
  getLeadRequests,
} = require("../controllers/adminController");

router.get("/leads", getLeads);
router.get("/lead-requests", getLeadRequests);

module.exports = router;
