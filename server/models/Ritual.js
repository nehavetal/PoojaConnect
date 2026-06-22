import mongoose from "mongoose";

const ritualSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // better structure for logic
    durationInMinutes: {
      type: Number,
      default: 60,
    },

    category: {
      type: String,
      enum: ["puja", "havan", "festival", "home", "temple"],
      default: "puja",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ritual", ritualSchema);