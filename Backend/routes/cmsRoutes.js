const express = require("express");
const router = express.Router();

const CMS = require("../models/CMS");
const { protect } = require("../middleware/authMiddleware");

/* ================= GET BLOGS ================= */
router.get("/", protect, async (req, res) => {
  try {

    // Admin sees all blogs
    const filter =
      req.user.role === "admin"
        ? {}
        : { author: req.user._id };

    const blogs = await CMS.find(filter)
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(blogs);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= CREATE BLOG ================= */
router.post("/", protect, async (req, res) => {
  try {

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content required",
      });
    }

    const blog = await CMS.create({
      title,
      content,
      author: req.user._id,
      status: "Published",
    });

    res.status(201).json(blog);

  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);
    res.status(500).json({
      message: "Failed to create blog",
    });
  }
});

module.exports = router;