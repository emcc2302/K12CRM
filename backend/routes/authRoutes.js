const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public route: Admin login
router.post('/login', authController.login);

// Protected route: Get authenticated admin profile
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;
