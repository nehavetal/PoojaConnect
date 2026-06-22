import Ritual from "../models/Ritual.js";

export const createRitual = async (req, res) => {
  try {
    const ritual = await Ritual.create(req.body);
    res.status(201).json(ritual);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getRituals = async (req, res) => {
  try {
    const rituals = await Ritual.find();
    res.json(rituals);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};