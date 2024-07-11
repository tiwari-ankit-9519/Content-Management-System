import apiConfig from "../utils/apiConfig";

const authApi = {
  register: async (userData, imageFile) => {
    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("dob", userData.dob);
    formData.append("gender", userData.gender);
    formData.append("address", userData.address);
    formData.append("phoneNumber", userData.phoneNumber);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await apiConfig.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Registration Error:", error.response);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiConfig.post("auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response);
      throw error;
    }
  },
};

export default authApi;
