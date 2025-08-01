const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe
} = require('../controllers/simpleAuthController');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);

module.exports = router;
