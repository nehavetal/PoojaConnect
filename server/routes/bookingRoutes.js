import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/", auth, getBookings);
router.patch("/:id/status", auth, updateBookingStatus);

export default router;