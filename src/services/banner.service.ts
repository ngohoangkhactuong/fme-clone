import apiClient from "@/config/api.config";
import type { ApiResponse, BannerDTO, BannerRequest } from "@/types/api.types";

const BANNER_ENDPOINT = "/banners";

export const bannerApi = {
  /**
   * Get all banners
   */
  getAll: async (): Promise<ApiResponse<BannerDTO[]>> => {
    const response =
      await apiClient.get<ApiResponse<BannerDTO[]>>(BANNER_ENDPOINT);
    return response.data;
  },

  /**
   * Get active banners only
   */
  getActive: async (): Promise<ApiResponse<BannerDTO[]>> => {
    const response = await apiClient.get<ApiResponse<BannerDTO[]>>(
      `${BANNER_ENDPOINT}/active`
    );
    return response.data;
  },

  /**
   * Get banner by ID
   */
  getById: async (id: number): Promise<ApiResponse<BannerDTO>> => {
    const response = await apiClient.get<ApiResponse<BannerDTO>>(
      `${BANNER_ENDPOINT}/${id}`
    );
    return response.data;
  },

  /**
   * Create a new banner (Admin only)
   */
  create: async (data: BannerRequest): Promise<ApiResponse<BannerDTO>> => {
    const response = await apiClient.post<ApiResponse<BannerDTO>>(
      BANNER_ENDPOINT,
      data
    );
    return response.data;
  },

  /**
   * Update a banner (Admin only)
   */
  update: async (
    id: number,
    data: BannerRequest
  ): Promise<ApiResponse<BannerDTO>> => {
    const response = await apiClient.put<ApiResponse<BannerDTO>>(
      `${BANNER_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete a banner (Admin only)
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${BANNER_ENDPOINT}/${id}`
    );
    return response.data;
  }
};

export default bannerApi;
