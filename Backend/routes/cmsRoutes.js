const router = require("express").Router();
const { requireAuth } = require("../config/passport");
const { requireAdmin } = require("../middleware/roleMiddleware");

const controller = require("../controllers/cmsController");

router.get("/", controller.getCMSList);
router.get("/:id", controller.getCMSById);

router.post("/", requireAuth, requireAdmin, controller.createCMS);
router.put("/:id", requireAuth, requireAdmin, controller.updateCMS);
router.delete("/:id", requireAuth, requireAdmin, controller.deleteCMS);

module.exports = router;