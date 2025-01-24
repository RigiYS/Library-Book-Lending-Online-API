const db = require('../config/db');

const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.promise().query(sql, [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const sql = 'SELECT user_id, username, email, role FROM users WHERE user_id = ?';
  const [rows] = await db.promise().query(sql, [id]);
  return rows[0];
};

const createUser = async (username, email, password, role) => {
  const sql = 'INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())';
  return db.promise().query(sql, [username, email, password, role]);
};

const updateUserById = async (user_id, username, email, password) => {
  const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?';
  console.log(user_id);
  
  return db.promise().query(sql, [username, email, password, user_id]);
};

const deleteUserById = async (id) => {
  const sql = 'DELETE FROM users WHERE user_id = ?';
  return db.promise().query(sql, [id]);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserById,
  deleteUserById,
};