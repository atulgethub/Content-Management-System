const CMS = require('../models/CMS');

exports.createCMS = async (req, res, next) => {
  try {
    const cmsData = {
      ...req.body,
      author: req.user._id
    };
    
    if (req.file) cmsData.featuredImage = req.file.path;
    
    const cms = new CMS(cmsData);
    await cms.save();
    
    res.status(201).json(cms);
  } catch (error) {
    next(error);
  }
};

exports.getCMSList = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    const filters = {};
    
    if (status) filters.status = status;
    if (category) filters.category = category;
    
    const cmsItems = await CMS.find(filters)
      .populate('author', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
      
    const total = await CMS.countDocuments(filters);
    
    res.json({
      items: cmsItems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getCMSById = async (req, res, next) => {
  try {
    const cms = await CMS.findById(req.params.id).populate('author', 'firstName lastName');
    if (!cms) return res.status(404).json({ message: 'CMS not found' });
    res.json(cms);
  } catch (error) {
    next(error);
  }
};

exports.updateCMS = async (req, res, next) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    if (req.file) updateData.featuredImage = req.file.path;
    
    const cms = await CMS.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName');
    
    if (!cms) return res.status(404).json({ message: 'CMS not found' });
    res.json(cms);
  } catch (error) {
    next(error);
  }
};

exports.deleteCMS = async (req, res, next) => {
  try {
    const cms = await CMS.findByIdAndUpdate(
      req.params.id,
      { status: 'archived' },
      { new: true }
    );
    if (!cms) return res.status(404).json({ message: 'CMS not found' });
    res.json({ message: 'CMS archived successfully' });
  } catch (error) {
    next(error);
  }
};
