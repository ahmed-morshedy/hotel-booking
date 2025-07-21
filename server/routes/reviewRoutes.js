const express = require('express');
const { createReview, getReviewsByHotel } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createReview);
router.get('/:hotelId', getReviewsByHotel);

module.exports = router;
