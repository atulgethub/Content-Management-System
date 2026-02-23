const mongoose = require("mongoose");

const CMSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Draft", "Published", "Archived"], default: "Draft" },
}, { timestamps: true });

CMSchema.pre("save", function () {
  if (this.title) {
    this.slug = this.title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }
});

module.exports = mongoose.model("CMS", CMSchema);