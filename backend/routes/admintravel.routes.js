const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travelPackage.controller");

// ADMIN-ONLY ROUTES (Create, Update, Delete)
router.post("/create", travelController.createTravelPackage);
router.patch("/update/:id", travelController.updateTravelPackage);
router.get("/get", travelController.getAllPackagesTravel);
router.delete("/:id", travelController.deleteTravelPackage);

module.exports = router;
