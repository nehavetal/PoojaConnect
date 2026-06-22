import Pandit from "../models/Pandit.js";

// CREATE PANDIT (ADMIN ONLY)
export const createPandit = async (req, res) => {
  try {
    const { name, experience, location, languages, price } = req.body;

    if (!name || !location || !price) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // safe language parsing
    let langArray = [];

    if (languages) {
      try {
        langArray =
          typeof languages === "string"
            ? JSON.parse(languages)
            : languages;
      } catch (err) {
        return res.status(400).json({ message: "Invalid languages format" });
      }
    }

    const photo = req.file?.path || "";

    const pandit = await Pandit.create({
      userId: req.user._id,
      name,
      experience,
      location,
      languages: langArray,
      price,
      photo,
    });

    res.status(201).json(pandit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PANDITS
export const getPandits = async (req, res) => {
  try {
    const pandits = await Pandit.find();
    res.json(pandits);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET PANDIT BY ID
export const getPanditById = async (req, res) => {
  try {
    console.log("ID:", req.params.id);

    const all = await Pandit.find();
    console.log("ALL PANDITS:", all);

    const pandit = await Pandit.findById(req.params.id);

    console.log("FOUND:", pandit);

    res.json(pandit);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};



// GET MY PANDIT PROFILE
export const getMyPanditProfile = async (req, res) => {
  try {
    const pandit = await Pandit.findOne({ userId: req.user._id });

    if (!pandit) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(pandit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};