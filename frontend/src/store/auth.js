import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/user/api/register",
  async (formData) => {
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:9000/auth/user/api/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/user/api/login",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/auth/user/api/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response?.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  try {
    const response = await axios.get(
      "http://localhost:9000/auth/user/api/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const logoutUser = createAsyncThunk(
  "auth/user/api/logout", // Use the slice name for the action type
  async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/auth/user/api/logout",

        {
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.user;
        state.isAuthenticated = action.payload?.success || false;
      })

      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload?.success || false;
        state.user = action.payload?.user || null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
