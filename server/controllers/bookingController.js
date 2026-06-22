import Booking from "../models/Booking.js";

// CREATE
export const createBooking = async (req, res) => {
  try {
    const { date, timeSlot, panditId, ritualId, location } = req.body;

    const userId = req.user.id || req.user._id;

    const booking = await Booking.create({
      date,
      timeSlot,
      location,
      panditId,
      ritualId: ritualId || null,
      userId,
      status: "pending",
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET (ROLE BASED)
export const getBookings = async (req, res) => {
  try {
    let filter = {};

    const userId = req.user.id || req.user._id;

    if (req.user.role === "admin") {
      filter = {};
    } 
    else if (req.user.role === "pandit") {
      filter = { panditId: userId };
    } 
    else {
      filter = { userId };
    }

    const bookings = await Booking.find(filter)
      .populate("userId", "name email")
      .populate("panditId", "name location price")
      .populate("ritualId", "name price");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["pending", "approved", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: "Status updated successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};