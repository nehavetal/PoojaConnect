import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import panditRoutes from "./routes/panditRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import ritualRoutes from "./routes/ritualRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.send("PujaConnect API Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pandits", panditRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rituals", ritualRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/availability", availabilityRoutes);
// FIX: absolute static path
import path from "path";
app.use("/uploads", express.static(path.resolve("uploads")));

const PORT = process.env.PORT || 5000;

// FIX: proper async startup
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
};

startServer();