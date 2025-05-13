import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/bookings";

// Create Booking
export const createBooking = createAsyncThunk(
  "booking/create",
  async ({ bookingData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Booking failed");
    }
  }
);

// Fetch All Bookings
export const getBookings = createAsyncThunk(
  "booking/getAll",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// Fetch Bookings by User ID (converted to createAsyncThunk)
export const getBookingsByUserId = createAsyncThunk(
  "booking/getByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update Booking
export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ id, bookingData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update/${id}`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// Delete Booking
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// Slice
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    currentBooking: null,
    status: "idle",
    error: null,
    fetchStatus: "idle",
    fetchError: null,
    updateStatus: "idle",
    updateError: null,
  },
  reducers: {
    resetBookingState: (state) => {
      state.status = "idle";
      state.error = null;
      state.currentBooking = null;
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
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      // Get Bookings by User ID
      .addCase(getBookingsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookingsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload; // Store bookings array
      })
      .addCase(getBookingsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Booking
      .addCase(updateBooking.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.bookings.findIndex(
          (b) => b._id === action.payload._id
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
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetBookingState, setCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
