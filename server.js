const app = require('./app');
const express = require('express');
const { register, userLogin, login } = require('./controllers/usersController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});