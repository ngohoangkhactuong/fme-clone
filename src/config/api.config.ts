import axios from "axios";

// API Base URL - adjust based on your environment
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 30000
});

// Token storage keys
const ACCESS_TOKEN_KEY = "fme:accessToken";
const REFRESH_TOKEN_KEY = "fme:refreshToken";

// Token management utilities
export const tokenStorage = {
  getAccessToken: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string): void =>
    localStorage.setItem(ACCESS_TOKEN_KEY, token),
  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string): void =>
    localStorage.setItem(REFRESH_TOKEN_KEY, token),
  clearTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            null,
            {
              params: { refreshToken }
            }
          );

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;
          tokenStorage.setAccessToken(accessToken);
          if (newRefreshToken) {
            tokenStorage.setRefreshToken(newRefreshToken);
          }

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          tokenStorage.clearTokens();
          window.location.href = "/signin";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
