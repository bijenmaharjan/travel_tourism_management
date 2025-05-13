import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API Configuration
const API_BASE_URL = "http://localhost:9000";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to handle API requests
const makeRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {
      message: error.message || "Network Error",
    };
    throw errorData;
  }
};

// Async Thunks
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await makeRequest(
        "post",
        "/auth/user/api/register",
        userData
      );
      if (!data.user)
        throw new Error("Registration successful but no user data returned");
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        details: error.errors || null,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await makeRequest(
        "post",
        "/auth/user/api/login",
        credentials
      );

      if (!data.user) {
        throw new Error("Authentication failed: No user data returned");
      }

      if (!data.user.userId) {
        throw new Error("User ID is missing in the response");
      }

      return {
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Login failed",
        details: error.details || null,
      });
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await makeRequest("get", "/auth/user/api/check-auth");

      if (!data.user) {
        throw new Error("No active session found");
      }

      return data.user;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Session check failed",
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await makeRequest("post", "/auth/user/api/logout");
      return true;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Logout failed",
      });
    }
  }
);

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastAction: null,
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.lastAction = "register/pending";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.lastAction = "register/fulfilled";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.lastAction = "register/rejected";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.lastAction = "login/pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.lastAction = "login/fulfilled";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.lastAction = "login/rejected";
      })

      // Check Authentication
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.lastAction = "checkAuth/pending";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.lastAction = "checkAuth/fulfilled";
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.lastAction = "checkAuth/rejected";
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.lastAction = "logout/pending";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.lastAction = "logout/fulfilled";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.lastAction = "logout/rejected";
      });
  },
});

// Export actions and reducer
export const { clearAuthError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
