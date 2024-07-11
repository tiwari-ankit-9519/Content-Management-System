import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../api/adminApi";

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserById = createAsyncThunk(
  "admin/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.getUserById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.deleteUser(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, isAdmin }, { rejectWithValue }) => {
    try {
      const response = await adminApi.updateUserRole(id, isAdmin);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "admin/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPostById = createAsyncThunk(
  "admin/getPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.getPostById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPostsAndCommentsByUser = createAsyncThunk(
  "admin/getPostsAndCommentsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await adminApi.getPostsAndCommentsByUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "admin/updatePost",
  async ({ id, postData, imageFile }, { rejectWithValue }) => {
    try {
      const response = await adminApi.updatePost(id, postData, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "admin/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.deletePost(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "admin/getAllComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAllComments();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "admin/updateComment",
  async ({ id, commentData }, { rejectWithValue }) => {
    try {
      const response = await adminApi.updateComment(id, commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "admin/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.deleteComment(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getStatsAndRecentItems = createAsyncThunk(
  "admin/getStatsAndRecentItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.getStatsAndRecentItems();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  posts: [],
  comments: [],
  stats: {},
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.meta.arg.id
        );
        if (index !== -1)
          state.users[index] = { ...state.users[index], ...action.payload };
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostsAndCommentsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsAndCommentsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.comments = action.payload.comments;
      })
      .addCase(getPostsAndCommentsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.meta.arg.id
        );
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...action.payload };
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.meta.arg
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (comment) => comment._id === action.meta.arg.id
        );
        if (index !== -1) {
          state.comments[index] = {
            ...state.comments[index],
            ...action.payload,
          };
        }
      })

      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.meta.arg
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStatsAndRecentItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatsAndRecentItems.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getStatsAndRecentItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
