const { validationResult } = require('express-validator');
const AuditRequest = require('../models/AuditRequest');

// @desc    Get all audit requests
// @route   GET /api/audit
// @access  Private (Admin)
const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const total = await AuditRequest.countDocuments(filter);
    const audits = await AuditRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: audits,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create audit request (public)
// @route   POST /api/audit
// @access  Public
const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const audit = await AuditRequest.create(req.body);
    res.status(201).json({
      success: true,
      data: audit,
      message: 'Audit request submitted successfully. We will review your website and get back to you!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update audit request status
// @route   PUT /api/audit/:id
// @access  Private (Admin)
const updateStatus = async (req, res, next) => {
  try {
    const { status, recommendations } = req.body;

    const audit = await AuditRequest.findByIdAndUpdate(
      req.params.id,
      { status, recommendations },
      { new: true, runValidators: true }
    );

    if (!audit) {
      return res.status(404).json({ success: false, message: 'Audit request not found' });
    }

    res.json({ success: true, data: audit });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, create, updateStatus };
