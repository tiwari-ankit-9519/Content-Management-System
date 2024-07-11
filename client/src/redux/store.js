import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import commentSlice from "./commentSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comments: commentSlice,
    user: userSlice,
    admin: adminSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
