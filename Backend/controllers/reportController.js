const Report = require("../models/Report");

exports.createReport = async (req, res) => {
  const report = new Report({ ...req.body, author: req.user._id });
  await report.save();
  res.status(201).json(report);
};

exports.getReports = async (req, res) => {
  const reports = req.user.role === "admin" ? await Report.find() : await Report.find({ author: req.user._id });
  res.json(reports);
};

exports.updateReportStatus = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: "Not found" });
  report.status = req.body.status;
  await report.save();
  res.json(report);
};