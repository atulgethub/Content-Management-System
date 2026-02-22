const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { requireAuth } = require("../middleware/authMiddleware");
const cmsController = require("../controllers/cmsController");

router.use(requireAuth); // protect all routes

router.get("/", cmsController.getCMSList); // list blogs
router.get("/:id", cmsController.getCMSById); // single blog
router.post("/", upload.single("featuredImage"), cmsController.createCMS); // create
router.put("/:id", upload.single("featuredImage"), cmsController.updateCMS); // update
router.delete("/:id", cmsController.deleteCMS); // delete/archive

module.exports = router;