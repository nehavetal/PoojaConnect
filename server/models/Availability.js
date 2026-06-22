import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pandit",
      required: true,
    },

    slots: [
      {
        time: {
          type: String,
          required: true,
        },

        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Availability", availabilitySchema);