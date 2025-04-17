require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./DB/mongDB");

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Database connection
connectToDb();

// Configuration
const PORT = process.env.PORT || 9000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View engine setup (for Socket.IO page)
app.set("view engine", "ejs");
app.get("/travel/map", (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    console.error("Render error:", err);
    res.status(500).send("Error rendering page");
  }
});
// Socket.IO setup
const io = socketIO(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected user:", socket.id);

  socket.on("send-location", (data) => {
    console.log("Location received from", socket.id, data);
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    io.emit("user-disconnected", socket.id);
  });
});

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

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start servers
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Main service failed to start: ${err}`);
  } else {
    console.log(`Main service running on port ${PORT}`);
  }
});

server.listen(SOCKET_PORT, (err) => {
  if (err) {
    console.error(`Socket.IO server failed to start: ${err}`);
  } else {
    console.log(`Socket.IO server running on port ${SOCKET_PORT}`);
  }
});
