const borrowRequestModel = require('../models/borrowRequestModel');
const borrowHistoryModel = require('../models/borrowHistoryModel')

const approveBorrowRequest = async (req, res) => {
  const { request_id, book_id } = req.body;
  const user_id = req.user.id
  try {
    const borrowRequest = await borrowRequestModel.getBorrowRequestById(request_id);
    console.log(borrowRequest)
    if (!borrowRequest) return res.status(404).json({ message: 'Borrow request not found' });

    if (borrowRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Borrow request is not pending' });
    }

    await borrowRequestModel.updateBorrowRequestStatus(request_id, 'approved');
    await borrowHistoryModel.createBorrowHistory(user_id, book_id)
    res.status(200).json({ message: 'Borrow request approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving borrow request', error });
  }
};

const rejectBorrowRequest = async (req, res) => {
  const { borrow_request_id } = req.body;
  try {
    const borrowRequest = await borrowRequestModel.getBorrowRequestById(borrow_request_id);
    if (!borrowRequest) return res.status(404).json({ message: 'Borrow request not found' });

    if (borrowRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Borrow request is not pending' });
    }

    await borrowRequestModel.updateBorrowRequestStatus(borrow_request_id, 'rejected');
    res.status(200).json({ message: 'Borrow request rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting borrow request', error });
  }
};

module.exports = { approveBorrowRequest, rejectBorrowRequest };
