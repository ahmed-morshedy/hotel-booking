const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  city: String,
  country: String,
  images: [String],
  amenities: [String],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', HotelSchema);
