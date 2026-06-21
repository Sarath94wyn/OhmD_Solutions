const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  tagline: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  features: [{ type: String }],
  screenshots: [{ type: String }],
  demoVideo: {
    type: String,
    trim: true,
  },
  demoUrl: {
    type: String,
    trim: true,
  },
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'starting', 'custom'],
      default: 'custom',
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      default: '₹',
    },
  },
  category: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
