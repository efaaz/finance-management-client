// src/features/auth/authSlice.js
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { privateInstance, publicInstance } from "../../api/axios";
import { api } from "../../api/apiSlice";
 // Make sure to import your API instance

// — THUNKS —
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await publicInstance.post("/register", userData);
      return response.data.data; // { user, accessToken }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Registration failed" }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await privateInstance.post("/login", credentials);
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await publicInstance.post("/google-signin", { code });
      return response.data.data; // { user, accessToken }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Google login failed" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await privateInstance.post("/logout");
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Logout failed" }
      );
    }
  }
);

// — SLICE —
const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload.data;
      state.isAuthenticated = !!action.payload;
    },
    clearAuthState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    // First: Specific cases using addCase()
    builder.addCase(logoutUser.fulfilled, (state) => {
      Object.assign(state, initialState);
      toast.success("Logout successful!");
    });
    
    // Common pending state
    builder.addMatcher(
      isAnyOf(
        registerUser.pending,
        loginUser.pending,
        googleLogin.pending,
        logoutUser.pending
      ),
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );

    // Successful authentication (register/login/google)
    builder.addMatcher(
      isAnyOf(
        registerUser.fulfilled,
        loginUser.fulfilled,
        googleLogin.fulfilled
      ),
      (state, { payload, meta }) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        
        // Safe message extraction with fallbacks
        let actionType = '';
        try {
          actionType = meta?.arg?.endpointName || 
                     (meta?.type ? meta.type.split("/")[1] : '');
        } catch (e) {
          console.warn('Could not determine action type', e);
        }
        
        const successMessage = {
          register: "Registration successful!",
          login: "Login successful!",
          googleLogin: "Google login successful!"
        }[actionType] || "Authentication successful!";
        
        toast.success(successMessage);
      }
    );

    // Handle RTK Query getMe success
    builder.addMatcher(
      api.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;
        state.isAuthenticated = true;
      }
    );

    // Common error handling
    builder.addMatcher(
      isAnyOf(
        registerUser.rejected,
        loginUser.rejected,
        googleLogin.rejected,
        logoutUser.rejected,
        api.endpoints.getMe.matchRejected
      ),
      (state, { payload, error }) => {
        state.isLoading = false;
        state.error = payload?.message || error?.message || "An error occurred";
        if (state.error) {
          toast.error(state.error);
        }
        
        // Clear auth state on specific errors (e.g., 401 Unauthorized)
        if (payload?.status === 401 || error?.status === 401) {
          Object.assign(state, initialState);
        }
      }
    );
  },
});

export const { setAccessToken, setUser, clearAuthState } = authSlice.actions;
export default authSlice.reducer;