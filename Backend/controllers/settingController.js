const CMS = require("../models/CMS");

exports.createCMS = async (req, res) => {
  const cms = new CMS({ ...req.body, author: req.user._id });
  if (req.file) cms.featuredImage = req.file.path;
  await cms.save();
  res.status(201).json(cms);
};

exports.getCMSList = async (req, res) => {
  const cms = await CMS.find(req.user.role === "admin" ? {} : { author: req.user._id }).populate("author", "firstName lastName");
  res.json(cms);
};

exports.getCMSById = async (req, res) => {
  const cms = await CMS.findById(req.params.id).populate("author", "firstName lastName");
  if (!cms) return res.status(404).json({ message: "CMS not found" });
  res.json(cms);
};

exports.updateCMS = async (req, res) => {
  const cms = await CMS.findById(req.params.id);
  if (!cms) return res.status(404).json({ message: "CMS not found" });
  if (req.user.role !== "admin" && !cms.author.equals(req.user._id))
    return res.status(403).json({ message: "Forbidden" });

  Object.assign(cms, req.body);
  if (req.file) cms.featuredImage = req.file.path;
  await cms.save();
  res.json(cms);
};

exports.deleteCMS = async (req, res) => {
  const cms = await CMS.findById(req.params.id);
  if (!cms) return res.status(404).json({ message: "CMS not found" });
  if (req.user.role !== "admin" && !cms.author.equals(req.user._id))
    return res.status(403).json({ message: "Forbidden" });

  cms.status = "archived";
  await cms.save();
  res.json({ message: "CMS archived successfully" });
};