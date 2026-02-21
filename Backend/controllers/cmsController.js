const CMS = require("../models/CMS");

exports.createCMS = async (req, res) => {
  const cms = await CMS.create({
    ...req.body,
    author: req.user._id
  });

  res.json(cms);
};

exports.getCMSList = async (req, res) => {
  const cms = await CMS.find()
    .populate("author", "firstName lastName")
    .sort({ createdAt: -1 });

  res.json(cms);
};

exports.getCMSById = async (req, res) => {
  const cms = await CMS.findById(req.params.id);
  res.json(cms);
};

exports.updateCMS = async (req, res) => {
  const cms = await CMS.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(cms);
};

exports.deleteCMS = async (req, res) => {
  await CMS.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};