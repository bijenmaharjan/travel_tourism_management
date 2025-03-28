import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import adminHotelSlice from "./admin/admin";
import bookingSlice from "./booking";
import travelPackageSlice from "../store/admin/admintravel";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminHotel: adminHotelSlice,
    booking: bookingSlice,
    travelPackage: travelPackageSlice, // Now correctly referencing the imported slice
  },
});

export default store;
