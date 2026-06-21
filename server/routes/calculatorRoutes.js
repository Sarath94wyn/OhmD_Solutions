const express = require('express');
const { body } = require('express-validator');
const { calculate } = require('../controllers/calculatorController');

const router = express.Router();

router.post(
  '/',
  [
    body('serviceType').notEmpty().withMessage('Service type is required'),
  ],
  calculate
);

module.exports = router;
