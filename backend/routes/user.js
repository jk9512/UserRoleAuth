const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const User = require('../models/User');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.get('/admin-data', auth, role(['admin']), (req, res) => {
  res.json({ secret: 'This is admin-only data' });
});

module.exports = router;
