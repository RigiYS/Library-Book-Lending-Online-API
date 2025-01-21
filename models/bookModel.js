// File: /src/models/bookModel.js
const db = require('../config/db');

const getAllBooks = async () => {
  const sql = 'SELECT * FROM books';
  const [rows] = await db.promise().query(sql);
  return rows;
};

const getBookById = async (id) => {
  const sql = 'SELECT * FROM books WHERE book_id = ?';
  const [rows] = await db.promise().query(sql, [id]);
  return rows[0];
};

const createBook = async (title, author, isbn, status) => {
  const sql = 'INSERT INTO books (title, author, isbn, status, created_at) VALUES (?, ?, ?, ?, NOW())';
  return db.promise().query(sql, [title, author, isbn, status]);
};

const updateBook = async (id, fields) => {
  const sql = `UPDATE books SET ${Object.keys(fields).map(key => `${key} = ?`).join(', ')} WHERE book_id = ?`;
  const values = [...Object.values(fields), id];
  return db.promise().query(sql, values);
};

const deleteBook = async (id) => {
  const sql = 'DELETE FROM books WHERE book_id = ?';
  return db.promise().query(sql, [id]);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};