const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sub-service name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
  },
  subServices: [subServiceSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
