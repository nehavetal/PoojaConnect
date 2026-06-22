import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // FIX: normalize email
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, // FIX: basic security
    },

    role: {
      type: String,
      enum: ["user", "pandit", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);