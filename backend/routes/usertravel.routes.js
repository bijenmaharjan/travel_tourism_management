const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travelPackage.controller");

router.get("/", travelController.getAllTravelPackages);
router.get("/get", travelController.getAllPackagesTravel);
router.get("/:id", travelController.getTravelPackage);
router.get("/category/:category", travelController.getTravelPackagesByCategory);
router.post("/:id/book", travelController.bookSeats);

module.exports = router;
