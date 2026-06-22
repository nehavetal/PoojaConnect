import express from "express";
import auth from "../middleware/authMiddleware.js";
import Availability from "../models/Availability.js";

const router = express.Router();

// CREATE AVAILABILITY
router.post("/", auth, async (req, res) => {
  try {
    const { date, slot } = req.body;

    if (!date || !slot) {
      return res.status(400).json({ message: "Date and slot required" });
    }

    const panditId = req.user.id || req.user._id;

    let availability = await Availability.findOne({ panditId });

    if (!availability) {
      availability = new Availability({
        panditId,
        slots: [{ time: slot, isBooked: false }],
      });
    } else {
      availability.slots.push({ time: slot, isBooked: false });
    }

    await availability.save();

    res.status(201).json({
      message: "Availability saved successfully",
      availability,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;