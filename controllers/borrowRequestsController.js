const borrowRequestModel = require('../models/borrowRequestModel');

const createBorrowRequest = async (req, res) => {
  const { book_id } = req.body;
  const user_id = req.user.id; // Ambil ID pengguna dari token JWT
  console.log('User ID:', userId);
  
  try {
    await borrowRequestModel.createBorrowRequest(user_id, book_id);
    res.status(201).json({ message: 'Borrow request created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating borrow request', error });
  }
};

const getBorrowRequests = async (req, res) => {
  const user_id = req.user.id; // Ambil ID pengguna dari token JWT
  try {
    const requests = await borrowRequestModel.getBorrowRequestsByUserId(user_id);
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrow requests', error });
  }
};

const getBorrowRequestById = async (req, res) => {
  try {
    const request = await borrowRequestModel.getBorrowRequestById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Borrow request not found' });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrow request', error });
  }
};

const updateBorrowRequestStatus = async (req, res) => {
  const { status } = req.body;
  try {
    await borrowRequestModel.updateBorrowRequestStatus(req.params.id, status);
    res.status(200).json({ message: 'Borrow request status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating borrow request', error });
  }
};

const deleteBorrowRequest = async (req, res) => {
  try {
    await borrowRequestModel.deleteBorrowRequest(req.params.id);
    res.status(200).json({ message: 'Borrow request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting borrow request', error });
  }
};

module.exports = {createBorrowRequest, getBorrowRequests, getBorrowRequestById, updateBorrowRequestStatus, deleteBorrowRequest};