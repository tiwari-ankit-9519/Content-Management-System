import apiConfig from "../utils/apiConfig";

const createPost = async (formData) => {
  try {
    const response = await apiConfig.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updatePost = async (postId, formData) => {
  try {
    const response = await apiConfig.put(`/posts/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deletePost = async (postId) => {
  try {
    const response = await apiConfig.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getAllPosts = async () => {
  try {
    const response = await apiConfig.get("/posts");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getPostById = async (postId) => {
  try {
    const response = await apiConfig.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { createPost, updatePost, deletePost, getAllPosts, getPostById };
