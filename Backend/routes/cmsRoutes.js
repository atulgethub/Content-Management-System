const express = require("express");
const router = express.Router();
const CMS = require("../models/CMS");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

/* ===== ADMIN DASHBOARD STATS ===== */
// Move this **above** the /:id route
router.get("/stats", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") 
      return res.status(403).json({ message: "Not authorized" });

    const totalCMS = await CMS.countDocuments();
    const totalDraft = await CMS.countDocuments({ status: "Draft" });
    const totalPublished = await CMS.countDocuments({ status: "Published" });
    const totalArchived = await CMS.countDocuments({ status: "Archived" });
    const totalUsers = await User.countDocuments();

    const recentCMS = await CMS.find()
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ totalCMS, totalDraft, totalPublished, totalArchived, totalUsers, recentCMS });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===== GET ALL CMS ===== */
router.get("/", protect, async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { status: "Published" };
    const cms = await CMS.find(filter)
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===== GET MY CMS ===== */
router.get("/myblogs", protect, async (req, res) => {
  try {
    const cms = await CMS.find({ author: req.user._id })
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===== GET SINGLE CMS ===== */
router.get("/:id", protect, async (req, res) => {
  try {
    const cms = await CMS.findById(req.params.id)
      .populate("author", "firstName lastName email");
    if (!cms) return res.status(404).json({ message: "CMS not found" });

    if (req.user.role !== "admin" && cms.status !== "Published" && cms.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===== CREATE CMS ===== */
router.post("/", protect, async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const cms = await CMS.create({
      title,
      content,
      author: req.user._id,
      status: status || "Draft",
    });
    res.status(201).json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===== UPDATE CMS ===== */
router.put("/:id", protect, async (req, res) => {
  try {
    const cms = await CMS.findById(req.params.id);
    if (!cms) return res.status(404).json({ message: "CMS not found" });

    if (cms.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    cms.title = req.body.title || cms.title;
    cms.content = req.body.content || cms.content;
    if (req.body.status && req.user.role === "admin") cms.status = req.body.status;

    const updated = await cms.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===== DELETE CMS ===== */
router.delete("/:id", protect, async (req, res) => {
  try {
    const cms = await CMS.findById(req.params.id);
    if (!cms) return res.status(404).json({ message: "CMS not found" });

    if (cms.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await cms.deleteOne();
    res.json({ message: "CMS deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;