const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Report || mongoose.model("Report", reportSchema);