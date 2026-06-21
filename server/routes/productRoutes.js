const express = require('express');
const { body } = require('express-validator');
const { getAll, getById, create, update, remove } = require('../controllers/productController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const productValidation = [
  body('name').notEmpty().withMessage('Product name is required').trim(),
  body('description').notEmpty().withMessage('Product description is required').trim(),
];

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', protect, productValidation, create);
router.put('/:id', protect, productValidation, update);
router.delete('/:id', protect, remove);

module.exports = router;
