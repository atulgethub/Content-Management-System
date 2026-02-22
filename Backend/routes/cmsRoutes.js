const express = require("express");
const router = express.Router();
const CMS = require("../models/CMS");
const { protect } = require("../middleware/authMiddleware");

// Get all blogs for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const cms = await CMS.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a blog
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: "Title and content required" });

  try {
    const blog = new CMS({
      title,
      content,
      author: req.user._id,
      status: "Published",
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;