import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import User from "../models/User.js";
import Pandit from "../models/Pandit.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// TEST ROUTE
router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Admin access granted ✅" });
  }
);

// STATS ROUTE (THIS WAS MISSING)
router.get("/stats",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const users = await User.countDocuments();
      const pandits = await Pandit.countDocuments();
      const bookings = await Booking.countDocuments();
      const pending = await Booking.countDocuments({ status: "pending" });

      return res.json({
        users,
        pandits,
        bookings,
        pending
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

export default router;