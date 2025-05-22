const mongoose = require("mongoose");

const tourbookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Travel",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    adults: {
      type: Number,
      required: true,
      min: 1,
    },
    children: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      default: "",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit-card", "pay-on-arrival"],
      default: "credit-card",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("TourBooking", tourbookingSchema);
module.exports = Booking;
