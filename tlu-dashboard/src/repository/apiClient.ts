import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from './api'; // Đảm bảo bạn có ENDPOINTS.AUTH.REFRESH

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, 
});

// Biến hỗ trợ xử lý nhiều request cùng lúc khi token hết hạn
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 1. Request Interceptor: Đính kèm token vào mỗi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Response Interceptor: Xử lý lỗi 401 (Hết hạn token)
apiClient.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (Unauthorized) và không phải là request gọi api refresh hoặc login
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        // Nếu đang refresh, cho request này vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true; // Đánh dấu đã thử refresh để tránh lặp vô tận
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error("No refresh token found in storage");
        
        console.log("[apiClient] Attempting to refresh token...");
        const res = await axios.post(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {
          refresh_token: refreshToken
        });

        // Handle both { data: { tokens } } and { tokens }
        const responseData = res.data.data || res.data;
        const newToken = responseData.access_token || responseData.accessToken;
        const newRefreshToken = responseData.refresh_token || responseData.refreshToken;

        if (!newToken) {
          console.error("[apiClient] Refresh failed: No access token in response", res.data);
          throw new Error("New access token not found in response");
        }

        // Lưu token mới vào storage
        localStorage.setItem('access_token', newToken);
        if (newRefreshToken) localStorage.setItem('refresh_token', newRefreshToken);

        console.log("[apiClient] Token refreshed successfully");

        // Chạy lại hàng đợi các request đang chờ
        processQueue(null, newToken);

        // Chạy lại chính request bị lỗi ban đầu với token mới
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return apiClient(originalRequest);

      } catch (refreshError: any) {
        console.error("[apiClient] Refresh token process failed:", refreshError.response?.data || refreshError.message);
        // Nếu refresh thất bại (ví dụ refresh token cũng hết hạn)
        processQueue(refreshError, null);
        
        // Xóa sạch và đẩy về login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;