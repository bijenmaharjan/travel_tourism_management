import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the slice
const initialState = {
  isLoading: false,
  hotelList: [],
  error: null, // You can optionally track errors
};

// Async Thunk to fetch all hotels
export const fetchAllHotels = createAsyncThunk(
  "/hotel/fetchAllHotels",
  async () => {
    const response = await axios.get(
      "http://localhost:9000/admin/api/get-hotels"
    );
    return response.data; // return the hotel list
  }
);

// Create slice for hotels
const adminHotelSlice = createSlice({
  name: "adminhotelslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHotels.pending, (state) => {
        state.isLoading = true; // Show loading when fetching data
      })
      .addCase(fetchAllHotels.fulfilled, (state, action) => {
        state.isLoading = false; // Hide loading after data is fetched
        state.hotelList = action.payload; // Store the fetched hotel list
      })
      .addCase(fetchAllHotels.rejected, (state, action) => {
        state.isLoading = false; // Hide loading if request fails
        state.error = action.error.message; // Optionally handle errors
      })
      .addCase(editHotel.fulfilled, (state, action) => {
        const index = state.hotelList.findIndex(
          (hotel) => hotel._id === action.payload._id
        );
        if (index !== -1) {
          state.hotelList[index] = action.payload;
        }
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotelList = state.hotelList.filter(
          (hotel) => hotel._id !== action.payload
        );
      });
  },
});

//Add Products
export const addNewHotel = createAsyncThunk(
  "/hotel/addNewHotel",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:9000/admin/api/create-hotel",
        formData,

        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return result?.data; // Ensure that the returned data contains a 'success' field
    } catch (error) {
      console.error("addNewHotel error:", error);
      return rejectWithValue(error.response?.data || "Failed to add hotel");
    }
  }
);

export const editHotel = createAsyncThunk(
  "admin/editHotel",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/admin/api/edit-hotels/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update hotel");
    }
  }
);

export const deleteHotel = createAsyncThunk(
  "admin/deleteHotel",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:9000/admin/api/delete-hotels/${id}`);
      return id; // Return the ID of the deleted hotel
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete hotel");
    }
  }
);

export default adminHotelSlice.reducer;
