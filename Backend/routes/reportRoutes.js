const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createReport,
  getReports,
  updateReportStatus,
} = require("../controllers/reportController");

// Use middleware properly
router.use(protect);

// Routes
router.get("/", getReports);
router.post("/", createReport);
router.put("/:id/status", updateReportStatus);

module.exports = router;