const express = require('express');
const { register, login, getUserDetails, updateUserDetails } = require('../controllers/usersController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rute registrasi dan login
router.post('/register', register);
router.post('/login', login);
router.get('/:id', authenticateToken, getUserDetails);
router.put('/:id', authenticateToken, updateUserDetails);

module.exports = router;