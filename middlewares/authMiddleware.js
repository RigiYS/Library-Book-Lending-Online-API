const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Format token: "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Token missing or invalid' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Tambahkan data pengguna ke req.user
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token', error });
  }
};

module.exports = authenticateToken;