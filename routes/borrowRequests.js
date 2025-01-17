const express = require('express');
const {
  createBorrowRequest,
  getBorrowRequests,
  getBorrowRequestById,
  updateBorrowRequestStatus,
  deleteBorrowRequest,
} = require('../controllers/borrowRequestsController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createBorrowRequest);
router.get('/', authenticateToken, getBorrowRequests);
router.get('/:id', authenticateToken, getBorrowRequestById);
router.put('/:id', authenticateToken, updateBorrowRequestStatus); // Admin only
router.delete('/:id', authenticateToken, deleteBorrowRequest);

module.exports = router;