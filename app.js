const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const borrowRequestRoutes = require('./routes/borrowRequests');

dotenv.config();

const app = express();

// Middleware global
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrow_requests', borrowRequestRoutes);

// Placeholder untuk rute
app.get('/', (req, res) => {
  res.send('Welcome to the Library API!');
});

module.exports = app;