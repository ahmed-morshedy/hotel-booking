const express = require('express');
const { createHotel, getHotels, getHotelById } = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('admin'), createHotel);
router.get('/', getHotels);
router.get('/:id', getHotelById);

module.exports = router;
