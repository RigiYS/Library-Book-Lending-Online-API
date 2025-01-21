const express = require('express');
const {
  register,
  login,
  getUserDetails,
  updateUserDetails,
  deleteUser,
} = require('../controllers/usersController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:id', authenticateToken, getUserDetails);
router.put('/:id', authenticateToken, updateUserDetails);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;