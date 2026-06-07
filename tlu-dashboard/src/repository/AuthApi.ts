import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";

export const loginAdmin = async (username: string, password: string) => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
      username,
      password,
    });

    const { success, data } = response.data;

    if (success && data) {
      // Lưu token vào localStorage để Interceptor có thể lấy ra dùng
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      // Lưu thêm info user nếu cần
      localStorage.setItem("user_info", JSON.stringify(data.user));
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Đã có lỗi xảy ra" };
  }
};

export const logout = async () => {
  try {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.USERS.ME);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Không thể lấy thông tin người dùng" };
  }
};
