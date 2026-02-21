const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
  title: String,

  type: {
    type: String,
    enum: ["sales", "analytics", "user", "cms"]
  },

  period: {
    type: String,
    enum: ["daily", "weekly", "monthly"]
  },

  data: mongoose.Schema.Types.Mixed,

  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);