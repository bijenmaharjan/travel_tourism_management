import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import adminHotelSlice from "./admin/admin";
import bookingSlice from "./booking";
import travelPackageReducer from "./admin/admintravel";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminHotel: adminHotelSlice,
    booking: bookingSlice,
    travelPackage: travelPackageReducer,
  },
});

export default store;
