import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserProfile();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "An unknown error occurred"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedFields, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      const changes = {};

      // Compare the current state with updated fields and collect changes
      for (const key of Object.keys(updatedFields)) {
        if (updatedFields[key] !== user.profile[key]) {
          changes[key] = updatedFields[key];
        }
      }

      // If there are changes, send them as a JSON object
      if (Object.keys(changes).length > 0) {
        const response = await userApi.updateUserProfile(changes);
        return response;
      } else {
        // If there are no changes, just return the current profile
        return user.profile;
      }
    } catch (error) {
      let errorInfo = "An unknown error occurred";
      if (error.response && error.response.data) {
        errorInfo = error.response.data.message || error.response.data;
      }
      return rejectWithValue(errorInfo);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the profile with the new data
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUserProfile } = userSlice.actions;

export default userSlice.reducer;
