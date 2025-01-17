const express = require('express');
const { register, login } = require('../controllers/usersController');

const router = express.Router();

// Rute registrasi dan login
router.post('/register', register);
router.post('/login', login);

module.exports = router;