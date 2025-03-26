const Travel = require("../../backend/models/travelPackage.model");

// Create a new travel package
exports.createTravelPackage = async (req, res) => {
  try {
    const travelPackage = new Travel(req.body);
    await travelPackage.save();
    res.status(201).json({
      success: true,
      data: travelPackage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all travel packages
exports.getAllTravelPackages = async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Travel.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const travelPackages = await query;

    res.status(200).json({
      success: true,
      results: travelPackages.length,
      data: travelPackages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.getAllPackagesTravel = async (req, res) => {
  try {
    const hotels = await Travel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching travel package", error });
  }
};

// Get a single travel package by ID
exports.getTravelPackage = async (req, res) => {
  try {
    const travelPackage = await Travel.findById(req.params.id);
    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        error: "Travel package not found",
      });
    }
    res.status(200).json({
      success: true,
      data: travelPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update a travel package
exports.updateTravelPackage = async (req, res) => {
  try {
    const travelPackage = await Travel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        error: "Travel package not found",
      });
    }
    res.status(200).json({
      success: true,
      data: travelPackage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a travel package
exports.deleteTravelPackage = async (req, res) => {
  try {
    const travelPackage = await Travel.findByIdAndDelete(req.params.id);
    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        error: "Travel package not found",
      });
    }
    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get travel packages by category
exports.getTravelPackagesByCategory = async (req, res) => {
  try {
    const travelPackages = await Travel.find({ category: req.params.category });
    res.status(200).json({
      success: true,
      results: travelPackages.length,
      data: travelPackages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Book seats in a travel package
exports.bookSeats = async (req, res) => {
  try {
    const { seats } = req.body;
    const travelPackage = await Travel.findById(req.params.id);

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        error: "Travel package not found",
      });
    }

    if (travelPackage.availableSeats < seats) {
      return res.status(400).json({
        success: false,
        error: "Not enough available seats",
      });
    }

    travelPackage.availableSeats -= seats;
    travelPackage.bookedSeats += seats;
    await travelPackage.save();

    res.status(200).json({
      success: true,
      data: travelPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
