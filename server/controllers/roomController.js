const Room = require('../models/Room');
const Booking = require('../models/Booking');

// @desc    Create room (Admin only)
// @route   POST /api/rooms
// @access  Admin
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get rooms by hotel
// @route   GET /api/rooms/:hotelId
// @access  Public
exports.getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await Room.find({ hotel: req.params.hotelId });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Check room availability
// @route   GET /api/rooms/check-availability?hotelId=&checkIn=&checkOut=
// @access  Public
exports.checkAvailability = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut } = req.query;
    if (!hotelId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'Missing parameters' });
    }
    const rooms = await Room.find({ hotel: hotelId });
    const bookings = await Booking.find({
      hotel: hotelId,
      $or: [
        { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
        { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
      ],
      status: 'booked'
    });
    const bookedRoomIds = bookings.map(b => b.room.toString());
    const availableRooms = rooms.filter(r => !bookedRoomIds.includes(r._id.toString()));
    res.json(availableRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
