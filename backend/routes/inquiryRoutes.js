const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public route: Submit inquiry form
router.post('/', inquiryController.createInquiry);

// Protected routes (Admin only via custom JWT middleware)
router.get('/', authenticateToken, inquiryController.getInquiries);
router.get('/stats', authenticateToken, inquiryController.getStats);
router.patch('/:id/status', authenticateToken, inquiryController.updateInquiryStatus);
router.delete('/:id', authenticateToken, inquiryController.deleteInquiry);

module.exports = router;
