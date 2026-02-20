const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  category: { type: String, default: 'general' },
  tags: [String],
  featuredImage: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('CMS', cmsSchema);
