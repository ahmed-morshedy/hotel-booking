const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomNumber: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Single, Double, Suite
  price: { type: Number, required: true },
  amenities: [String],
  maxGuests: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
