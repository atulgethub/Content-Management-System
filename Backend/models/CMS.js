const mongoose = require("mongoose");

const cmsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, default: "Draft" }, // Draft / Published
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
module.exports = mongoose.models?.CMS || mongoose.model("CMS", cmsSchema);