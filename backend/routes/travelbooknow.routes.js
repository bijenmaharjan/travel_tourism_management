const express = require("express");
const { body } = require("express-validator");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking,
  getBookingsByUserId,
} = require("../../backend/controllers/travelbook.controller");

const router = express.Router();

// Validation middleware
const validateBooking = [
  body("user").notEmpty().withMessage("User is required"),

  body("checkIn").isISO8601().withMessage("Check-in date is required"),

  body("adults").isInt({ min: 1 }).withMessage("At least 1 adult is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),

  body("totalAmount")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be valid"),
];

router.post("/create", validateBooking, createBooking);
router.get("/", getAllBookings);
router.get("/user/:userId", getBookingsByUserId);
router.put("/update/:id", validateBooking, updateBooking);
router.delete("/delete/:id", deleteBooking);

module.exports = router;
