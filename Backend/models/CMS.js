const mongoose = require("mongoose");
const slugify = require("slugify");

const cmsSchema = new mongoose.Schema(
{
  title: { type: String, required: true },
  slug: { type: String, unique: true },

  content: String,
  excerpt: String,

  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft"
  },

  category: String,
  tags: [String],
  featuredImage: String,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
);

cmsSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
});

module.exports = mongoose.model("CMS", cmsSchema);