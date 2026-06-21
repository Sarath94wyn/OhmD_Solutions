const express = require('express');
const { body } = require('express-validator');
const { getAll, getById, create, update, remove } = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const portfolioValidation = [
  body('title').notEmpty().withMessage('Portfolio title is required').trim(),
  body('category')
    .isIn(['Website', 'Application', 'UI Design', 'Marketing', 'AI Project'])
    .withMessage('Category must be one of: Website, Application, UI Design, Marketing, AI Project'),
  body('description').notEmpty().withMessage('Description is required').trim(),
];

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', protect, portfolioValidation, create);
router.put('/:id', protect, portfolioValidation, update);
router.delete('/:id', protect, remove);

module.exports = router;
