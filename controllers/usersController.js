const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(username, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully' });
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;
  try {
    const user = await userModel.findUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await userModel.updateUser(userId, { username, email });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user details', error });
  }
};

module.exports = { register, login, getUserDetails, updateUserDetails };