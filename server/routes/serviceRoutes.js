const express = require('express');
const { body } = require('express-validator');
const { getAll, getById, create, update, remove } = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const serviceValidation = [
  body('title').notEmpty().withMessage('Service title is required').trim(),
  body('description').notEmpty().withMessage('Service description is required').trim(),
];

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', protect, serviceValidation, create);
router.put('/:id', protect, serviceValidation, update);
router.delete('/:id', protect, remove);

module.exports = router;
