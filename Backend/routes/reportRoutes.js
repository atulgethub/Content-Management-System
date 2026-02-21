const router = require("express").Router();
const { requireAuth } = require("../config/passport");
const { getDashboardStats } = require("../controllers/reportController");

router.get("/dashboard", requireAuth, getDashboardStats);

module.exports = router;