const User = require("../models/User");
const CMS = require("../models/CMS");

// Admin Dashboard Stats
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalCMS = await CMS.countDocuments();
    const totalUsers = await User.countDocuments();
    const draftCMS = await CMS.countDocuments({ status: "Draft" });
    const publishedCMS = await CMS.countDocuments({ status: "Published" });

    // Recent 5 CMS entries
    const recentCMS = await CMS.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "firstName lastName email");

    res.json({
      totalCMS,
      totalUsers,
      draftCMS,
      publishedCMS,
      recentCMS,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};