const express = require('express');
const { getBorrowHistory, getBorrowHistoryById } = require('../controllers/borrowHistoryController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rute untuk riwayat peminjaman
router.get('/', authenticateToken, getBorrowHistory);
router.get('/:id', authenticateToken, getBorrowHistoryById);

module.exports = router;