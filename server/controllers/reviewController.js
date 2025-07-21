const Review = require('../models/Review');
const Hotel = require('../models/Hotel');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { hotel, rating, comment } = req.body;
    if (!hotel || !rating) {
      return res.status(400).json({ message: 'Hotel and rating required' });
    }
    // Prevent multiple reviews per user per hotel
    const alreadyReviewed = await Review.findOne({ user: req.user._id, hotel });
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this hotel' });
    }
    const review = await Review.create({ user: req.user._id, hotel, rating, comment });
    // Update hotel rating
    const reviews = await Review.find({ hotel });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Hotel.findByIdAndUpdate(hotel, { rating: avgRating, numReviews: reviews.length });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get reviews for hotel
// @route   GET /api/reviews/:hotelId
// @access  Public
exports.getReviewsByHotel = async (req, res) => {
  try {
    const reviews = await Review.find({ hotel: req.params.hotelId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
