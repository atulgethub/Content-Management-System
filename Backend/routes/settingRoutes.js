const router = require("express").Router();
const { requireAuth } = require("../config/passport");
const { requireAdmin } = require("../middleware/roleMiddleware");

const controller = require("../controllers/settingController");

router.get("/", requireAuth, controller.getSettings);
router.post("/", requireAuth, requireAdmin, controller.updateSetting);

module.exports = router;