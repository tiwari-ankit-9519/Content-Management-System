import apiConfig from "../utils/apiConfig";

const adminApi = {
  getAllUsers: async () => {
    try {
      const response = await apiConfig.get("/admin/users");
      // Check if response.data exists before returning it
      if (response && response.data) {
        return response.data;
      } else {
        // Handle case where response.data is undefined
        console.error("Response data is undefined.");
        return null;
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error("An error occurred:", error);
      throw error.response
        ? error.response.data
        : new Error("An unexpected error occurred");
    }
  },

  getUserById: async (id) => {
    try {
      const response = await apiConfig.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await apiConfig.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateUserRole: async (id, isAdmin) => {
    try {
      const response = await apiConfig.put(`/admin/users/${id}/role`, {
        isAdmin,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllPosts: async () => {
    try {
      const response = await apiConfig.get("/admin/posts");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getPostById: async (id) => {
    try {
      const response = await apiConfig.get(`/admin/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getPostsAndCommentsByUser: async (userId) => {
    try {
      const response = await apiConfig.get(`/admin/posts/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updatePost: async (id, postData, imageFile) => {
    try {
      const formData = new FormData();
      Object.keys(postData).forEach((key) =>
        formData.append(key, postData[key])
      );
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const response = await apiConfig.put(`/admin/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deletePost: async (id) => {
    try {
      const response = await apiConfig.delete(`/admin/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllComments: async () => {
    try {
      const response = await apiConfig.get("/admin/comments");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateComment: async (id, commentData) => {
    try {
      const response = await apiConfig.put(
        `/admin/comments/${id}`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteComment: async (id) => {
    try {
      const response = await apiConfig.delete(`/admin/comments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getStatsAndRecentItems: async () => {
    try {
      const response = await apiConfig.get("/admin/stats");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default adminApi;
