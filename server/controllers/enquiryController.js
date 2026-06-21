const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const { sendEmail } = require('../utils/email');

// @desc    Get all enquiries
// @route   GET /api/enquiries
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
    if (req.query.type) {
      filter.type = req.query.type;
    }

    const total = await Enquiry.countDocuments(filter);
    const enquiries = await Enquiry.find(filter)
      .populate('productId', 'name')
      .populate('serviceId', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: enquiries,
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

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
const getById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('productId', 'name')
      .populate('serviceId', 'title');

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Create enquiry (public)
// @route   POST /api/enquiries
// @access  Public
const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const enquiryData = { ...req.body };
    if (enquiryData.productId && !mongoose.Types.ObjectId.isValid(enquiryData.productId)) {
      delete enquiryData.productId;
    }
    if (enquiryData.serviceId && !mongoose.Types.ObjectId.isValid(enquiryData.serviceId)) {
      delete enquiryData.serviceId;
    }

    const enquiry = await Enquiry.create(enquiryData);

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    if (adminEmail) {
      try {
        await sendEmail(
          adminEmail,
          `New Enquiry: ${enquiry.type} from ${enquiry.name}`,
          `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Phone:</strong> ${enquiry.phone || 'N/A'}</p>
          <p><strong>Type:</strong> ${enquiry.type}</p>
          <p><strong>Message:</strong></p>
          <p>${enquiry.message}</p>
          <hr>
          <p><em>Sent from OhmD Solutions Website</em></p>
          `
        );
      } catch (emailErr) {
        console.error('SMTP Enquiry Email notification failed:', emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      data: enquiry,
      message: 'Enquiry submitted successfully. We will get back to you soon!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
const updateStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
const remove = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, updateStatus, remove };
