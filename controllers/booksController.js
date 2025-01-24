const bookModel = require('../models/bookModel');
const axios = require('axios');

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookModel.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

const searchBook = async (req, res) => {
  console.log(req.query.query);
  
  try {
    const response = await axios.get(`https://api.bigbookapi.com/search-books?api-key=${process.env.API_KEY_LIBRARY}&query=${req.query.query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching book', error });
  }
}

const createBook = async (req, res) => {
  const { title, author, isbn, status } = req.body;
  try {
    await bookModel.createBook(title, author, isbn, status);
    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

const updateBook = async (req, res) => {
  const fields = req.body;
  try {
    await bookModel.updateBook(req.params.id, fields);
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

const deleteBook = async (req, res) => {
  try {
    await bookModel.deleteBook(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

module.exports = {getAllBooks, getBookById, searchBook, createBook, updateBook, deleteBook};
