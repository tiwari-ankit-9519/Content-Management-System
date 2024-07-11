import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import { jwtDecode } from "jwt-decode";

export const register = createAsyncThunk(
  "auth/register",
  async ({ userData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData, imageFile);
      localStorage.setItem("token", response.token);
      localStorage.setItem("isAdmin", response.user.isAdmin);
      return { user: response.user, token: response.token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("isAdmin", response.user.isAdmin);
      return { user: response.user, token: response.token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sessionValidated = createAsyncThunk(
  "auth/sessionValidated",
  async (_, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const user = {
          ...getState().auth.user,
          ...decoded,
          isAdmin: isAdmin,
        };
        return { user, token };
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        return rejectWithValue("Session is invalid or expired");
      }
    }
    return rejectWithValue("No active session");
  }
);

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sessionValidated.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(sessionValidated.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
