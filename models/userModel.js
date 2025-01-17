const db = require('../config/db');

const createUser = async (username, email, password) => {
  const sql = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())';
  return db.promise().query(sql, [username, email, password]);
};

const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.promise().query(sql, [email]);
  return rows[0];
};

module.exports = {createUser, findUserByEmail};