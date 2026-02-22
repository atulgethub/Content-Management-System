const Setting = require("../models/Setting");

exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body; // { key: value, ... }
    const result = [];

    for (const key in updates) {
      const setting = await Setting.findOneAndUpdate(
        { key },
        { value: updates[key], updatedBy: req.user._id },
        { new: true, upsert: true }
      );
      result.push(setting);
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};