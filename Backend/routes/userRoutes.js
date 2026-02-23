const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

/* =========================
   GET ALL USERS (Admin only)
========================= */
router.get("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error("GET ALL USERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   UPDATE USER (Admin only)
========================= */
router.put("/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    // Validate role
    if (req.body.role && ["admin", "user"].includes(req.body.role)) {
      user.role = req.body.role;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   DELETE USER (Admin only)
========================= */
router.delete("/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: Delete CMS posts of this user
    // await CMS.deleteMany({ author: user._id });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;