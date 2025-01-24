const express = require('express');
const { approveBorrowRequest, rejectBorrowRequest } = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authMiddleware'); // Middleware autentikasi
const checkAdmin = require('../middlewares/adminMiddleware'); // Middleware untuk validasi admin

const router = express.Router();

// Endpoint untuk admin
router.post('/approve_borrow', authenticateToken, checkAdmin, approveBorrowRequest);
router.post('/reject_borrow', authenticateToken, checkAdmin, rejectBorrowRequest);

module.exports = router;
