const mongoose = require("mongoose");

const travelPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    category: {
      type: String,
      enum: [
        "Adventure",
        "Luxury",
        "Family",
        "Honeymoon",
        "Cultural",
        "Wildlife",
      ],
      required: true,
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
      },
    },
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    price: {
      basePrice: { type: Number, required: true },
      discount: { type: Number, default: 0 },
    },

    mealsIncluded: {
      type: [String], // Example: ["Breakfast", "Lunch"]
      default: [],
    },

    roomtype: String, // Example: "Deluxe Suite"
    amenities: String, // Example: ["WiFi", "Gym", "Pool"]

    transportation: {
      type: String,
      enum: ["Flight", "Bus"],
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Travel", travelPackageSchema);
