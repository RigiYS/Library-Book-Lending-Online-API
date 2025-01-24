const db = require('../config/db');

const getBorrowHistoryByUserId = async (userId) => {
  const sql = `
    SELECT bh.history_id, bh.book_id, b.title, b.author, bh.borrow_date, bh.return_date
    FROM borrow_history bh
    JOIN books b ON bh.book_id = b.book_id
    WHERE bh.user_id = ?`;
  const [rows] = await db.promise().query(sql, [userId]);
  return rows;
};

const getBorrowHistoryById = async (historyId) => {
  const sql = `
    SELECT bh.history_id, bh.book_id, b.title, b.author, bh.borrow_date, bh.return_date
    FROM borrow_history bh
    JOIN books b ON bh.book_id = b.book_id
    WHERE bh.history_id = ?`;
  const [rows] = await db.promise().query(sql, [historyId]);
  return rows[0];
};

const createBorrowHistory = async (user_id, book_id) => {
  const sql = 'INSERT INTO borrow_history (`user_id`, `book_id`, `borrow_date`) VALUES (?, ?, ?)';
  const borrowDate = new Date()
  const [rows] = await db.promise().query(sql, [user_id, book_id, borrowDate]);
  return rows[0];
  
};

module.exports = {
  getBorrowHistoryByUserId,
  getBorrowHistoryById,
  createBorrowHistory
};
