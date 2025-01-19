const borrowHistoryModel = require('../models/borrowHistoryModel');

const getBorrowHistory = async (req, res) => {
  const userId = req.user.id; // Ambil ID pengguna dari token JWT
  try {
    const history = await borrowHistoryModel.getBorrowHistoryByUserId(userId);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrow history', error });
  }
};

const getBorrowHistoryById = async (req, res) => {
  const historyId = req.params.id;
  try {
    const history = await borrowHistoryModel.getBorrowHistoryById(historyId);
    if (!history) return res.status(404).json({ message: 'Borrow history not found' });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrow history details', error });
  }
};

module.exports = { getBorrowHistory, getBorrowHistoryById };
