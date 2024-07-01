const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Example route with validation
router.post('/register', [
  // Validate and sanitize fields using express-validator
  body('name').trim().not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with registration logic if validation passes
  // Example: Save user to database
  // const { name, email, password } = req.body;
  // User.create({ name, email, password })
  //   .then(user => res.json(user))
  //   .catch(err => res.status(500).json({ msg: 'Server Error' }));
});

module.exports = router;
