const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel.controller");

// Route for creating a hotel
router.post("/create-hotel", hotelController.createHotel);

router.get("/get-hotels", hotelController.getAllHotels);

// Get a single hotel by ID
router.get("/hotels-ids/:id", hotelController.getHotelById);

// Update a hotel by ID
router.put("/edit-hotels/:id", hotelController.updateHotel);

// Delete a hotel by ID
router.delete("/delete-hotels/:id", hotelController.deleteHotel);

module.exports = router;
