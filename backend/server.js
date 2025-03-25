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

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
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

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server failed to start: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
