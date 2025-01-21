const borrowRequestModel = require('../models/borrowRequestModel');

const getAnalytics = async (req, res) => {
  try {
    const sql = `
      SELECT b.title, COUNT(bh.book_id) AS borrow_count
      FROM borrow_history bh
      JOIN books b ON bh.book_id = b.id
      GROUP BY bh.book_id
      ORDER BY borrow_count DESC
      LIMIT 5;
    `;
    const [rows] = await borrowRequestModel.queryRaw(sql);
    res.status(200).json({ message: 'Borrowing trends and popular books', data: rows });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
};

const approveBorrowRequest = async (req, res) => {
  const { request_id } = req.body;
  try {
    const borrowRequest = await borrowRequestModel.getBorrowRequestById(request_id);
    if (!borrowRequest) return res.status(404).json({ message: 'Borrow request not found' });

    if (borrowRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Borrow request is not pending' });
    }

    await borrowRequestModel.updateBorrowRequestStatus(borrow_request_id, 'approved');
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

module.exports = { getAnalytics, approveBorrowRequest, rejectBorrowRequest };
