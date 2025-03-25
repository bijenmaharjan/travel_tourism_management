const mongoose = require("mongoose");

const hotelReviewSchema = new mongoose.Schema(
  {
    hotelId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("productReview", hotelReviewSchema);
