// commentApi.js
import apiConfig from "../utils/apiConfig";

const createComment = async (postId, content) => {
  try {
    const response = await apiConfig.post("/comments/posts/:postId/comments", {
      postId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error.response?.data);
    throw error;
  }
};

const updateComment = async (commentId, content) => {
  try {
    const response = await apiConfig.put(`/comments/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error.response?.data);
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const response = await apiConfig.delete(`/comments/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error.response?.data);
    throw error;
  }
};

const getAllCommentsForPost = async (postId) => {
  try {
    const response = await apiConfig.get(`/comments/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments for post:", error.response?.data);
    throw error;
  }
};

const getCommentById = async (commentId) => {
  try {
    const response = await apiConfig.get(`/comments/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comment by ID:", error.response?.data);
    throw error;
  }
};

export {
  createComment,
  updateComment,
  deleteComment,
  getAllCommentsForPost,
  getCommentById,
};
