const express = require('express');
const { body } = require('express-validator');
const { getAll, create, updateStatus } = require('../controllers/auditController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const auditValidation = [
  body('businessName').notEmpty().withMessage('Business name is required').trim(),
  body('contactEmail').isEmail().withMessage('Please enter a valid email'),
];

// Public route for submitting audit request
router.post('/', auditValidation, create);

// Admin routes
router.get('/', protect, getAll);
router.put('/:id', protect, updateStatus);

module.exports = router;
