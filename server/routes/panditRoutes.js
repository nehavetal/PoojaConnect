import express from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

import {
  createPandit,
  getPandits,
  getPanditById,
  getMyPanditProfile
} from "../controllers/panditController.js";

const router = express.Router();

// CREATE PANDIT (ADMIN ONLY)
router.post(
  "/",
  auth,
  role(["admin"]),
  upload.single("photo"),
  createPandit
);

// GET ALL PANDITS
router.get("/", getPandits);
router.get("/me", auth, getMyPanditProfile);
// GET SINGLE PANDIT
router.get("/:id", getPanditById);

export default router;