const express = require('express');
const { body } = require('express-validator');
const { getAll, getBySlug, create, update, remove, togglePublish } = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const blogValidation = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('content').notEmpty().withMessage('Content is required'),
];

router.get('/', getAll);
router.get('/:slug', getBySlug);
router.post('/', protect, blogValidation, create);
router.put('/:id', protect, blogValidation, update);
router.put('/:id/toggle-publish', protect, togglePublish);
router.delete('/:id', protect, remove);

module.exports = router;
