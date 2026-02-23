const express = require("express");
const router = express.Router();
const CMS = require("../models/CMS");
const { protect } = require("../middleware/authMiddleware");


// GET BLOGS
router.get("/", protect, async (req, res) => {
  try {

    const filter =
      req.user.role === "admin"
        ? {}
        : { author: req.user._id };

    const blogs = await CMS.find(filter)
      .populate("author", "firstName email")
      .sort({ createdAt: -1 });

    res.json(blogs);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// CREATE BLOG
router.post("/", protect, async (req, res) => {
  try {

    const blog = await CMS.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
      status: "Published",
    });

    res.status(201).json(blog);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// UPDATE BLOG
router.put("/:id", protect, async (req, res) => {

  const blog = await CMS.findById(req.params.id);

  if (!blog)
    return res.status(404).json({ message: "Not found" });

  if (
    req.user.role !== "admin" &&
    !blog.author.equals(req.user._id)
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(blog, req.body);

  await blog.save();

  res.json(blog);
});


// DELETE BLOG (ADMIN)
router.delete("/:id", protect, async (req, res) => {

  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  await CMS.findByIdAndDelete(req.params.id);

  res.json({ message: "Blog deleted" });
});

module.exports = router;