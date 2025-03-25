// controllers/hotel.controller.js
const Hotel = require("../models/hotel.model");
// const { handleImageUploads } = require("../helpers/cloudinary");

// // Upload images and return the result
// module.exports.uploadImages = async (req, res) => {
//   try {
//     console.log("resimgae", req.files);
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No files uploaded",
//       });
//     }

//     // Handle image uploads to Cloudinary
//     const result = await handleImageUploads(req.files); // Assuming `handleImageUploads` processes multiple files
//     const imageUrls = result.map((img) => img.secure_url);

//     return res.status(200).json({
//       success: true,
//       message: "Images uploaded successfully",
//       imageUrls, // Return array of image URLs
//     });
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// Create a new hotel
module.exports.createHotel = async (req, res) => {
  try {
    const {
      name,
      location,
      address,
      description,
      pricePerNight,
      peoples,
      amenities,
      roomsAvailable,
      phone,
      email,
      website,
      checkInTime,
      checkOutTime,
      images,
    } = req.body;
    console.log("res", req.body);
    const hotel = new Hotel({
      name,
      location,
      address,
      description,
      pricePerNight,
      peoples,
      amenities,
      images, // Array of image URLs
      roomsAvailable,
      phone,
      email,
      website,
      checkInTime,
      checkOutTime,
    });

    await hotel.save();
    res.status(201).json({
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating hotel",
      error,
    });
  }
};

// Get all hotels
module.exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels", error });
  }
};

// Get a single hotel by ID
module.exports.getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.id; // Extract ID from params

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: "Invalid hotel ID format" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel", error });
  }
};

// Update a hotel by ID
module.exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error updating hotel", error });
  }
};

// Delete a hotel by ID
module.exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hotel", error });
  }
};
