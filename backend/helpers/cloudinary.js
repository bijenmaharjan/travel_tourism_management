const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Route to handle uploading multiple images
router.post("/upload", upload.array("hotelimage", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Map over each uploaded file and upload to Cloudinary
    const imageUrls = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { resource_type: "auto" }, // Automatically detect resource type (image/video)
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result.secure_url); // Resolve with the image URL from Cloudinary
                }
              }
            )
            .end(file.buffer); // Send the file buffer to Cloudinary
        });
      })
    );

    // Return the image URLs in the response
    res.json({
      message: "Files uploaded successfully!",
      urls: imageUrls, // Array of URLs from Cloudinary
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error uploading files", error: error.message });
  }
});

module.exports = router;
