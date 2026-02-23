const CMS = require("../models/CMS");
const User = require("../models/User");

// ===== GET ALL CMS (admin sees all, user sees own or published) =====
exports.getCMSList = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { status: "Published" };
    const cms = await CMS.find(filter)
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.json(cms);
  } catch (err) {
    console.error("GET CMS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===== CREATE CMS =====
exports.createCMS = async (req, res) => {
  try {
    const cms = new CMS({ ...req.body, author: req.user._id });
    await cms.save();
    res.status(201).json(cms);
  } catch (err) {
    console.error("CREATE CMS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===== UPDATE CMS =====
exports.updateCMS = async (req, res) => {
  try {
    const cms = await CMS.findById(req.params.id);
    if (!cms) return res.status(404).json({ message: "CMS not found" });

    // Only admin or author can update
    if (req.user.role !== "admin" && !cms.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(cms, req.body); // title, content, status
    await cms.save();
    res.json(cms);
  } catch (err) {
    console.error("UPDATE CMS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===== DELETE CMS =====
exports.deleteCMS = async (req, res) => {
  try {
    const cms = await CMS.findById(req.params.id);
    if (!cms) return res.status(404).json({ message: "CMS not found" });

    // Only admin or author can delete
    if (req.user.role !== "admin" && !cms.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await cms.deleteOne();
    res.json({ message: "CMS deleted successfully" });
  } catch (err) {
    console.error("DELETE CMS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===== ADMIN DASHBOARD STATS =====
exports.getAdminDashboard = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const totalCMS = await CMS.countDocuments();
    const totalDraft = await CMS.countDocuments({ status: "Draft" });
    const totalPublished = await CMS.countDocuments({ status: "Published" });
    const totalArchived = await CMS.countDocuments({ status: "Archived" });
    const totalUsers = await User.countDocuments();

    const recentCMS = await CMS.find()
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCMS,
      totalDraft,
      totalPublished,
      totalArchived,
      totalUsers,
      recentCMS,
    });
  } catch (err) {
    console.error("ADMIN DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};