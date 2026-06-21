const mongoose = require('mongoose');

const auditRequestSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
  },
  currentWebsite: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  contactPhone: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'sent'],
    default: 'pending',
  },
  recommendations: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AuditRequest', auditRequestSchema);
