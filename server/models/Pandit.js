import mongoose from "mongoose";

const panditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    photo: {
      type: String,
      default: "",
    },

    languages: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
    },

    // improved verification system
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // rating system (future-ready)
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pandit", panditSchema);