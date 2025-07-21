const express = require('express');
const { createRoom, getRoomsByHotel, checkAvailability } = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('admin'), createRoom);
router.get('/:hotelId', getRoomsByHotel);
router.get('/check-availability', checkAvailability);

module.exports = router;
