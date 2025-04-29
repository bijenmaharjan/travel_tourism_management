const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const Booking = require("../models/hotelbooking.model");

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // ✅ Corrected key
    pass: process.env.EMAIL_PASS, // ✅ Corrected key
  },
});

exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const booking = new Booking(req.body);
    await booking.save();

    const mailOptions = {
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: booking.email, // Email address from booking form
      subject: "Booking Confirmation",
      html: `
        <h1>Thank you for your booking!</h1>
        <p>Hi ${booking.name},</p>
        <p>Your booking has been successfully confirmed.</p>
        <p><strong>Booking ID:</strong> ${booking._id}</p>
      `,
    };
    console.log("email", mailOptions);

    // Send the email
    await transporter.sendMail(mailOptions);

    // Emit event to Socket.IO
    const io = req.app.get("io");
    if (io) io.emit("bookingCreated", booking);

    // Send response to client
    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking or email error:", error);
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

// Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user hotel");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Fix: Get Booking By ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user hotel"
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: err.message });
  }
};

// Update Booking
exports.updateBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("user hotel");

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
