import apiConfig from "../utils/apiConfig";

const userApi = {
  getUserProfile: async () => {
    try {
      const response = await apiConfig.get("/users/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserProfile: async (updatedFields) => {
    try {
      // Convert updatedFields object to JSON
      const response = await apiConfig.put(
        "/users/profile",
        JSON.stringify(updatedFields),
        {
          headers: {
            "Content-Type": "application/json",
            // Include other necessary headers, such as authorization if needed
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
