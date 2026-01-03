import apiClient from "@/config/api.config";
import type { ApiResponse, UserDTO } from "@/types/api.types";

const ADMIN_USER_ENDPOINT = "/admin/users";

export const adminUserApi = {
  /**
   * Get all users (Admin only)
   */
  getAll: async (): Promise<ApiResponse<UserDTO[]>> => {
    const response =
      await apiClient.get<ApiResponse<UserDTO[]>>(ADMIN_USER_ENDPOINT);
    return response.data;
  },

  /**
   * Get user by ID (Admin only)
   */
  getById: async (id: number): Promise<ApiResponse<UserDTO>> => {
    const response = await apiClient.get<ApiResponse<UserDTO>>(
      `${ADMIN_USER_ENDPOINT}/${id}`
    );
    return response.data;
  },

  /**
   * Deactivate user (Admin only)
   */
  deactivate: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.put<ApiResponse<void>>(
      `${ADMIN_USER_ENDPOINT}/${id}/deactivate`
    );
    return response.data;
  },

  /**
   * Activate user (Admin only)
   */
  activate: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.put<ApiResponse<void>>(
      `${ADMIN_USER_ENDPOINT}/${id}/activate`
    );
    return response.data;
  }
};

export default adminUserApi;
