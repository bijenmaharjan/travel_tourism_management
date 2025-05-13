require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
// require("./config/passwort-config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectToDb = require("./DB/mongDB");
const esewaRoute = require("./routes/Esewa.routes");

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app); // important for Socket.IO

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Database connection
connectToDb();

// Configuration
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "content-Type",
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
app.use(express.static(path.join(__dirname, "public")));

// View engine setup (for Socket.IO test page)
app.set("view engine", "ejs");
app.get("/travel/map", (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    console.error("Render error:", err);
    res.status(500).send("Error rendering page");
  }
});
app.use(
  session({ secret: "your_secret_key", resave: true, saveUninitialized: true })
);

// Socket.IO event handling
// io.on("connection", (socket) => {
//   console.log("⚡ New client connected:", socket.id);

//   socket.on("chat message", (msg) => {
//     console.log("Message received:", msg);
//     io.emit("chat message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("🚪 Client disconnected:", socket.id);
//   });
// });

// API Routes
const apiRoutes = [
  { path: "/auth/user/api", router: require("./routes/user.routes") },
  { path: "/admin/api", router: require("./routes/hotel.routes") },
  { path: "/admin/api/image", router: require("./helpers/cloudinary") },
  { path: "/api/bookings", router: require("./routes/hotelbooknow.routes") },

  {
    path: "/api/v1/admin/travel-packages",
    router: require("./routes/admintravel.routes"),
  },
  {
    path: "/api/v1/travel-packages",
    router: require("./routes/usertravel.routes"),
  },
];

apiRoutes.forEach((route) => {
  app.use(route.path, route.router);
});

app.use("/esewa", esewaRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server with Socket.IO support
server.listen(PORT, (err) => {
  if (err) {
    console.error(`Main service failed to start: ${err}`);
  } else {
    console.log(`🚀 Server is running on port ${PORT}`);
  }
});
