const { validationResult } = require("express-validator");
const QRCode = require("qrcode");
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

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(booking));

    const mailOptions = {
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Booking Confirmation",
      html: `
        <h1>Thank you for your booking!</h1>
        <p>Hi ${booking.name},</p>
        <p>Your booking has been successfully confirmed.</p>
        <p><strong>Booking ID:</strong> ${booking._id}</p>
        <!-- Reference the image using cid -->
        <img src="cid:qrcode" alt="QR Code" style="display: block; margin: 20px auto; width: 200px; height: 200px;"/>
      `,
      attachments: [
        {
          filename: "booking-qr.png",
          path: qrCodeDataURL,
          cid: "qrcode", // same cid value as in the html img src
        },
      ],
    };

    console.log("Sending email to:", booking.email);

    // Send the email with mailOptions
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
exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const booking = new Booking(req.body);
    console.log("booking", booking);
    await booking.save();

    // Format booking data for QR code
    const bookingData = {
      "Booking ID": booking._id,
      "Guest Name": booking.name,
      Email: booking.email,
      "Check-in": booking.checkIn?.toLocaleDateString(),
      "Check-out": booking.checkOut?.toLocaleDateString(),
      "no of Rooms": booking.roomsRequired,
      nights: booking.nights,
      Guests: booking.adults,
      Children: booking.children,
      "Total Amount": `$${booking.totalAmount?.toFixed(2)}`,
      Status: booking.paymentMethod,
    };

    // Convert to readable text
    const qrText = Object.entries(bookingData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(qrText);

    const mailOptions = {
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Booking Confirmation",
      html: `
        <h1>Thank you for your booking!</h1>
        <p>Hi ${booking.name},</p>
        <p>Your booking has been successfully confirmed.</p>
        <p><strong>Booking ID:</strong> ${booking._id}</p>
        <div style="text-align: center; margin: 20px 0;">
          <img src="cid:qrcode" alt="Booking QR Code" style="width: 200px; height: 200px;"/>
          <p style="color: #666; font-size: 14px;">
            Scan this QR code to view your booking details
          </p>
        </div>
        
      `,
      attachments: [
        {
          filename: "booking-qr.png",
          path: qrCodeDataURL,
          cid: "qrcode",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    const io = req.app.get("io");
    if (io) io.emit("bookingCreated", booking);

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking error:", error);
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

// Get all bookings for a specific user
exports.getBookingsByUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("user hotel")
      .sort({ createdAt: -1 }); // Sort by newest first

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user bookings",
      error: err.message,
    });
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
