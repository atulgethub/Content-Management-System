const CMS = require("../models/CMS");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  const totalCMS = await CMS.countDocuments();
  const totalUsers = await User.countDocuments();

  res.json({
    totalCMS,
    totalUsers
  });
};