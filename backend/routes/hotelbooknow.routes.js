const express = require("express");
const { body } = require("express-validator");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking,
} = require("../controllers/hotelbook.controller");

const router = express.Router();

// Validation rules
const validateBooking = [
  body("user").notEmpty().withMessage("User is required"),
  body("hotel").notEmpty().withMessage("Hotel is required"),
  body("checkIn").isISO8601().withMessage("Check-in date is required"),
  body("checkOut").isISO8601().withMessage("Check-out date is required"),
  body("adults").isInt({ min: 1 }).withMessage("At least 1 adult is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("roomsRequired")
    .isInt({ min: 1 })
    .withMessage("At least 1 room is required"),
  body("nights").isInt({ min: 1 }).withMessage("Nights should be at least 1"),
  body("totalAmount")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be valid"),
  body("paymentMethod")
    .isIn(["credit-card", "pay-on-arrival"])
    .withMessage("Invalid payment method"),
];

// Routes
router.post("/createbooking", validateBooking, createBooking);
router.get("/getallbookings", getAllBookings);
router.get("/:id", getBookingById);
router.put("/update/:id", validateBooking, updateBooking);
router.delete("/delete/:id", deleteBooking);

module.exports = router;
