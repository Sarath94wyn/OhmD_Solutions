const express = require('express');
const { body } = require('express-validator');
const { getAll, getById, create, updateStatus, remove } = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const enquiryValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('type')
    .isIn(['product_demo', 'service_enquiry', 'general'])
    .withMessage('Type must be one of: product_demo, service_enquiry, general'),
  body('message').notEmpty().withMessage('Message is required').trim(),
];

// Public route for creating enquiries
router.post('/', enquiryValidation, create);

// Admin routes
router.get('/', protect, getAll);
router.get('/:id', protect, getById);
router.put('/:id', protect, updateStatus);
router.delete('/:id', protect, remove);

module.exports = router;
