const Hotel = require('../models/Hotel');

// @desc    Create hotel (Admin only)
// @route   POST /api/hotels
// @access  Admin
exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create({ ...req.body, owner: req.user._id });
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
