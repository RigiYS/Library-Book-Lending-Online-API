const express = require('express');
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require('../controllers/booksController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook); // Admin only
router.put('/:id', updateBook); // Admin only
router.delete('/:id', deleteBook); // Admin only

module.exports = router;
