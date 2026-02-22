const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { requireAuth } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");
const cmsController = require("../controllers/cmsController");

router.get("/", requireAuth, cmsController.getCMSList);
router.get("/:id", requireAuth, cmsController.getCMSById);
router.post("/", requireAuth, upload.single("featuredImage"), cmsController.createCMS);
router.put("/:id", requireAuth, upload.single("featuredImage"), cmsController.updateCMS);
router.delete("/:id", requireAuth, cmsController.deleteCMS);

module.exports = router;