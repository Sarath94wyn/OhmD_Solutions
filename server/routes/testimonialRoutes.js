const express = require('express');
const { body } = require('express-validator');
const { getAll, create, update, remove } = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const testimonialValidation = [
  body('clientName').notEmpty().withMessage('Client name is required').trim(),
  body('content').notEmpty().withMessage('Testimonial content is required').trim(),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
];

router.get('/', getAll);
router.post('/', protect, testimonialValidation, create);
router.put('/:id', protect, testimonialValidation, update);
router.delete('/:id', protect, remove);

module.exports = router;
