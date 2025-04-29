import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/bookings";

// Create
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

// Fetch All
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

// ✅ Fix: Fetch By ID
export const getBookingById = createAsyncThunk(
  "booking/getById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch booking by ID"
      );
    }
  }
);

// Update
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

// Delete
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

      .addCase(getBookingById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBooking = action.payload;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateBooking.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const idx = state.bookings.findIndex(
          (b) => b._id === action.payload._id
        );
        if (idx !== -1) state.bookings[idx] = action.payload;
        state.currentBooking = action.payload;
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      });
  },
});

export const { resetBookingState, setCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
