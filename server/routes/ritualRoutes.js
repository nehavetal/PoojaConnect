import express from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import { createRitual, getRituals } from "../controllers/ritualController.js";

const router = express.Router();

// ADMIN ONLY
router.post("/", auth, role(["admin"]), createRitual);

// PUBLIC ACCESS (OK for listing rituals)
router.get("/", getRituals);

export default router;