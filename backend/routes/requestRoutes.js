const express = require("express");
const router = express.Router();

console.log("🔥 requestRoutes loaded");

const requestController = require("../controllers/requestController");

router.get("/", requestController.getAllRequests);
router.post("/", requestController.createRequest);

module.exports = router;
