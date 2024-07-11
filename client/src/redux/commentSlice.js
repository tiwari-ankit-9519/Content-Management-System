// commentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createComment,
  updateComment,
  deleteComment,
  getAllCommentsForPost,
  getCommentById,
} from "../api/commentApi";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

// Async thunk actions
export const createCommentAsync = createAsyncThunk(
  "comments/createComment",
  async ({ postId, content }) => {
    const response = await createComment(postId, content);
    return response;
  }
);

export const updateCommentAsync = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, content }) => {
    const response = await updateComment(commentId, content);
    return response;
  }
);

export const deleteCommentAsync = createAsyncThunk(
  "comments/deleteComment",
  async (commentId) => {
    await deleteComment(commentId);
    return commentId;
  }
);

export const fetchAllCommentsForPostAsync = createAsyncThunk(
  "comments/fetchAllCommentsForPost",
  async (postId) => {
    const response = await getAllCommentsForPost(postId);
    return response;
  }
);

export const fetchCommentByIdAsync = createAsyncThunk(
  "comments/fetchCommentById",
  async (commentId) => {
    const response = await getCommentById(commentId);
    return response;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
      })
      .addCase(updateCommentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(fetchAllCommentsForPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchCommentByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        } else {
          state.comments.push(action.payload);
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default commentSlice.reducer;
