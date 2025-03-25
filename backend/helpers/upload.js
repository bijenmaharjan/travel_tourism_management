// upload.js
const multer = require("multer");

// Set storage engine to memory storage (to avoid saving to disk)
const storage = multer.memoryStorage();

// Initialize multer with memory storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
