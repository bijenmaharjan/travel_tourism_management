require("dotenv").config();
const express = require("express");
const connectTODb = require("./DB/mongDB");

const cors = require("cors");
const cookieParser = require("cookie-parser");

connectTODb();

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/user.routes");
const hotelRoutes = require("./routes/hotel.routes");
const hotelCLoudinary = require("./helpers/cloudinary");
const bookingRoutes = require("./routes/hotelbooknow.routes");
const adminTravelRoutes = require("./routes/admintravel.routes");
const userTravelRoutes = require("./routes/usertravel.routes");
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Upload route handling file uploads with Cloudinary integration

app.use("/auth/user/api", userRoutes);
app.use("/admin/api", hotelRoutes);
app.use("/admin/api/image", hotelCLoudinary);
app.use("/api/bookings", bookingRoutes);
// Admin routes (protected)
app.use("/api/v1/admin/travel-packages", adminTravelRoutes);

// User/public routes
app.use("/api/v1/travel-packages", userTravelRoutes);

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server failed to start: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
