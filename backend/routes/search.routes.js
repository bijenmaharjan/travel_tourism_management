const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel.model");
const TravelPackage = require("../models/travelPackage.model");

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    // Default response structure
    const defaultResponse = {
      success: true,
      hotels: [],
      packages: [],
    };

    // Validate query
    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({
        ...defaultResponse,
        success: false,
        message: "Search query is required",
      });
    }

    const cleanedQuery = query.trim();

    // Search both collections in parallel
    const [hotels, packages] = await Promise.all([
      Hotel.find({
        $or: [
          { name: { $regex: cleanedQuery, $options: "i" } },
          { location: { $regex: cleanedQuery, $options: "i" } },
        ],
      })
        .select("name location _id")
        .limit(5)
        .lean(),

      TravelPackage.find({
        $or: [
          { title: { $regex: cleanedQuery, $options: "i" } },
          { destination: { $regex: cleanedQuery, $options: "i" } },
        ],
      })
        .select("title destination _id")
        .limit(5)
        .lean(),
    ]);

    res.json({
      ...defaultResponse,
      hotels,
      packages,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during search",
      hotels: [],
      packages: [],
    });
  }
});

module.exports = router;
