const mongoose = require("mongoose");

// Define the Hotel Schema
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String], // Array of amenities (e.g., Wi-Fi, Pool, Gym, etc.)
    },

    images: { type: [String], required: true },
    roomsAvailable: {
      type: Number,
      required: true,
    },
    peoples: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    checkInTime: {
      type: String, // Check-in time (e.g., "3:00 PM")
      required: true,
    },
    checkOutTime: {
      type: String, // Check-out time (e.g., "11:00 AM")
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Hotel model
const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
