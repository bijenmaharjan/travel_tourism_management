import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import adminHotelSlice from "./admin/admin";
import bookingSlice from "./booking";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminHotel: adminHotelSlice,
    booking: bookingSlice,
  },
});

export default store;
