const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    metric: { type: String, trim: true },
    value: { type: String, trim: true },
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Portfolio title is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Website', 'Application', 'UI Design', 'Marketing', 'AI Project'],
  },
  client: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  images: [{ type: String }],
  videoUrl: {
    type: String,
    trim: true,
  },
  caseStudy: {
    type: String, // markdown
  },
  results: [resultSchema],
  technologies: [{ type: String }],
  liveUrl: {
    type: String,
    trim: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
