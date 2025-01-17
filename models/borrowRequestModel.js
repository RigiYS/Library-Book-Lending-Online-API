const db = require('../config/db');

const createBorrowRequest = async (userId, bookId) => {
  const sql = 'INSERT INTO borrow_requests (user_id, book_id, status, created_at) VALUES (?, ?, "pending", NOW())';
  return db.promise().query(sql, [userId, bookId]);
};

const getBorrowRequestsByUserId = async (userId) => {
  const sql = 'SELECT * FROM borrow_requests WHERE user_id = ?';
  const [rows] = await db.promise().query(sql, [userId]);
  return rows;
};

const getBorrowRequestById = async (id) => {
  const sql = 'SELECT * FROM borrow_requests WHERE request_id = ?';
  const [rows] = await db.promise().query(sql, [id]);
  return rows[0];
};

const updateBorrowRequestStatus = async (id, status) => {
  const sql = 'UPDATE borrow_requests SET status = ? WHERE request_id = ?';
  return db.promise().query(sql, [status, id]);
};

const deleteBorrowRequest = async (id) => {
  const sql = 'DELETE FROM borrow_requests WHERE request_id = ?';
  return db.promise().query(sql, [id]);
};

module.exports = {createBorrowRequest, getBorrowRequestsByUserId, getBorrowRequestById, updateBorrowRequestStatus, deleteBorrowRequest};
