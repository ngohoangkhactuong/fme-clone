import apiClient, { tokenStorage } from "@/config/api.config";
import type {
  ApiResponse,
  AuthResponse,
  ChangePasswordRequest,
  SignInRequest,
  SignUpRequest,
  UpdateProfileRequest,
  UserDTO
} from "@/types/api.types";

const AUTH_ENDPOINT = "/auth";

export const authApi = {
  /**
   * Sign up a new user
   */
  signUp: async (data: SignUpRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${AUTH_ENDPOINT}/signup`,
      data
    );

    // Store tokens on successful signup
    if (response.data.success && response.data.data) {
      const { accessToken, refreshToken } = response.data.data;
      tokenStorage.setAccessToken(accessToken);
      tokenStorage.setRefreshToken(refreshToken);
    }

    return response.data;
  },

  /**
   * Sign in with email and password
   */
  signIn: async (data: SignInRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${AUTH_ENDPOINT}/signin`,
      data
    );

    // Store tokens on successful login
    if (response.data.success && response.data.data) {
      const { accessToken, refreshToken } = response.data.data;
      tokenStorage.setAccessToken(accessToken);
      tokenStorage.setRefreshToken(refreshToken);
    }

    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (
    refreshToken: string
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${AUTH_ENDPOINT}/refresh`,
      null,
      { params: { refreshToken } }
    );

    // Store new tokens
    if (response.data.success && response.data.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      tokenStorage.setAccessToken(accessToken);
      if (newRefreshToken) {
        tokenStorage.setRefreshToken(newRefreshToken);
      }
    }

    return response.data;
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<ApiResponse<UserDTO>> => {
    const response = await apiClient.get<ApiResponse<UserDTO>>(
      `${AUTH_ENDPOINT}/me`
    );
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (
    data: UpdateProfileRequest
  ): Promise<ApiResponse<UserDTO>> => {
    const response = await apiClient.put<ApiResponse<UserDTO>>(
      `${AUTH_ENDPOINT}/profile`,
      data
    );
    return response.data;
  },

  /**
   * Change user password
   */
  changePassword: async (
    data: ChangePasswordRequest
  ): Promise<ApiResponse<void>> => {
    const response = await apiClient.put<ApiResponse<void>>(
      `${AUTH_ENDPOINT}/change-password`,
      data
    );
    return response.data;
  },

  /**
   * Sign out - clears local tokens
   */
  signOut: (): void => {
    tokenStorage.clearTokens();
  }
};

export default authApi;
