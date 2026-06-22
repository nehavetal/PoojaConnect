import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Pandit from "../models/Pandit.js";

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const pandits = await Pandit.countDocuments();
    const bookings = await Booking.countDocuments();

    const pending = await Booking.countDocuments({ status: "pending" });

    res.json({
      users,
      pandits,
      bookings,
      pending,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};