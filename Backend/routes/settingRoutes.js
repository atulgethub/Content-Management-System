const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware"); // Make sure this exists
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController"); // Make sure exported as CommonJS functions

// Protect all settings routes
router.use(protect);

// Routes
router.get("/", getSettings);       // get current settings
router.post("/", updateSettings);   // update settings

module.exports = router;