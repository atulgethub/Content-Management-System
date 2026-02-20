const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['sales', 'analytics', 'user', 'cms'], required: true },
  period: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  data: mongoose.Schema.Types.Mixed,
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
