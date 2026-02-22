const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { createReport, getReports, updateReportStatus } = require("../controllers/reportController");

router.use(requireAuth);

router.get("/", getReports);
router.post("/", createReport);
router.put("/:id/status", updateReportStatus);

module.exports = router;