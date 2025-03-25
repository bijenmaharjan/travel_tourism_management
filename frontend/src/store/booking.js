import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/bookings";

// Existing createBooking thunk
export const createBooking = createAsyncThunk(
  "booking/create",
  async ({ bookingData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/createbooking`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Booking failed");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Get all bookings
export const getBookings = createAsyncThunk(
  "booking/getAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getallbookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch bookings"
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

// Get booking by ID
export const getBookingById = createAsyncThunk(
  "booking/getById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch booking"
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

// Update booking
export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ id, bookingData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, bookingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Update failed");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Delete booking
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Delete failed");
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  fetchStatus: "idle",
  fetchError: null,
  updateStatus: "idle",
  updateError: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.status = "idle";
      state.error = null;
      state.booking = null;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get All Bookings
      .addCase(getBookings.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      // Get Booking By ID
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Booking
      .addCase(updateBooking.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.bookings.findIndex(
          (booking) => booking._id === action.payload._id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        state.currentBooking = action.payload;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })

      // Delete Booking
      .addCase(deleteBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetBookingState, setCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
