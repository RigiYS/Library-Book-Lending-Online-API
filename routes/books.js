const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/adminMiddleware');
const {getAllBooks, getBookById, createBook, updateBook, deleteBook, searchBook} = require('../controllers/booksController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/search', searchBook);
router.get('/:id', getBookById);
router.post('/', authenticateToken, checkAdmin, createBook); // Admin only
router.put('/:id', authenticateToken, checkAdmin, updateBook); // Admin only
router.delete('/:id', authenticateToken, checkAdmin, deleteBook); // Admin only

module.exports = router;
