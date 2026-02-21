const Setting = require("../models/Setting");

exports.getSettings = async (req, res) => {
  const settings = await Setting.find();
  res.json(settings);
};

exports.updateSetting = async (req, res) => {
  const setting = await Setting.findOneAndUpdate(
    { key: req.body.key },
    req.body,
    { upsert: true, new: true }
  );

  res.json(setting);
};