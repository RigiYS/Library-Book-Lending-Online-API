const db = require('../config/db');

const getBorrowHistoryByUserId = async (userId) => {
  const sql = `
    SELECT bh.history_id, bh.book_id, b.title, b.author, bh.borrow_date, bh.return_date
    FROM borrow_history bh
    JOIN books b ON bh.book_id = b.id
    WHERE bh.user_id = ?`;
  const [rows] = await db.promise().query(sql, [userId]);
  return rows;
};

const getBorrowHistoryById = async (historyId) => {
  const sql = `
    SELECT bh.history_id, bh.book_id, b.title, b.author, bh.borrow_date, bh.return_date
    FROM borrow_history bh
    JOIN books b ON bh.book_id = b.id
    WHERE bh.history_id = ?`;
  const [rows] = await db.promise().query(sql, [historyId]);
  return rows[0];
};

module.exports = {
  getBorrowHistoryByUserId,
  getBorrowHistoryById,
};
