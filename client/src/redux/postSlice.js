import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
} from "../api/postApi";

export const fetchAllPosts = createAsyncThunk("posts/fetchAll", async () => {
  const response = await getAllPosts();
  return response;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId) => {
    const response = await getPostById(postId);
    return response;
  }
);

export const createNewPost = createAsyncThunk(
  "posts/create",
  async (formData) => {
    const response = await createPost(formData);
    return response;
  }
);

export const updateExistingPost = createAsyncThunk(
  "posts/update",
  async ({ postId, formData }) => {
    const response = await updatePost(postId, formData);
    return response;
  }
);

export const deleteExistingPost = createAsyncThunk(
  "posts/delete",
  async (postId) => {
    await deletePost(postId);
    return postId;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updateExistingPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deleteExistingPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPostById = (state, postId) =>
  state.post.posts.find((post) => post._id === postId);

export default postSlice.reducer;
