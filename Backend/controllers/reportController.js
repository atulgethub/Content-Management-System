const CMS = require('../models/CMS');
const User = require('../models/User');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [totalCMS, totalUsers, totalDrafts, recentCMS] = await Promise.all([
      CMS.countDocuments({ status: 'published' }),
      User.countDocuments({ isActive: true }),
      CMS.countDocuments({ status: 'draft' }),
      CMS.find({ status: 'published' })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('author', 'firstName lastName')
    ]);

    res.json({
      stats: {
        totalCMS,
        totalUsers,
        totalDrafts
      },
      recentCMS
    });
  } catch (error) {
    next(error);
  }
};
