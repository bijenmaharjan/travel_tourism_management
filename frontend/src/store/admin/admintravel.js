import { Category } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  packages: [],
  isLoading: false,
  error: null,
};

// Fetch all travel packages
export const fetchTravelPackages = createAsyncThunk(
  "travelPackage/fetchAll",
  async () => {
    const response = await axios.get(
      "http://localhost:9000/api/v1/admin/travel-packages/get"
    );
    return response.data;
  }
);

// Create new travel package
export const createTravelPackage = createAsyncThunk(
  "travelPackage/create",
  async (packageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/admin/travel-packages/create",
        packageData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create package"
      );
    }
  }
);

// Update travel package
export const updateTravelPackage = createAsyncThunk(
  "travelPackage/update",
  async ({ id, packageData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:9000/api/v1/admin/travel-packages/update/${id}`,
        packageData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update package"
      );
    }
  }
);

// Fetch packages by category
export const fetchPackagesByCategory = createAsyncThunk(
  "travelPackage/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/admin/travel-packages/category/${category}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch packages by category"
      );
    }
  }
);

// Delete travel package
export const deleteTravelPackage = createAsyncThunk(
  "travelPackage/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/v1/admin/travel-packages/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete package"
      );
    }
  }
);

const travelPackageSlice = createSlice({
  name: "travelPackage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all packages
      .addCase(fetchTravelPackages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTravelPackages.fulfilled, (state, action) => {
        state.packages = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTravelPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Create package
      .addCase(createTravelPackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTravelPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages.push(action.payload);
      })
      .addCase(createTravelPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update package
      .addCase(updateTravelPackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTravelPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.packages.findIndex(
          (pkg) => pkg._id === action.payload._id
        );
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })
      .addCase(updateTravelPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete package
      .addCase(deleteTravelPackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTravelPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = state.packages.filter(
          (pkg) => pkg._id !== action.payload
        );
      })
      .addCase(deleteTravelPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPackagesByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPackagesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackagesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default travelPackageSlice.reducer;
