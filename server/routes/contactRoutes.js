const express = require('express');
const { body } = require('express-validator');
const { getAll, create, markRead, remove } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const contactValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('subject').notEmpty().withMessage('Subject is required').trim(),
  body('message').notEmpty().withMessage('Message is required').trim(),
];

// Public route for submitting contact form
router.post('/', contactValidation, create);

// Admin routes
router.get('/', protect, getAll);
router.put('/:id/read', protect, markRead);
router.delete('/:id', protect, remove);

module.exports = router;
