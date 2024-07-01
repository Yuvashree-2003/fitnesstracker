const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Adjust path as per your directory structure
const User = require('../models/User'); // Adjust path as per your directory structure

// @route   GET /profile
// @desc    Get user profile
// @access  Private (requires authentication)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Fetch user details excluding the password field
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user); // Send user data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
