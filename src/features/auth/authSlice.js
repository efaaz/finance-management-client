import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { toast } from "sonner";

const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  appLoaded: false, // To track initial auth check
};

// Async Thunks
export const silentRefresh = createAsyncThunk(
  "auth/silentRefresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/refresh");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Session expired" });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Registration failed" });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/logout");
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Logout failed" });
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/google", { code });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Google login failed" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Initial silent refresh check
      .addCase(silentRefresh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(silentRefresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appLoaded = true;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(silentRefresh.rejected, (state) => {
        state.isLoading = false;
        state.appLoaded = true;
        state.isAuthenticated = false;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message);
      })

      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        toast.success("Logout successful!");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;