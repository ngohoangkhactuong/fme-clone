import apiClient from "@/config/api.config";
import type { ApiResponse, NewsDTO, NewsRequest } from "@/types/api.types";

const NEWS_ENDPOINT = "/news";

export const newsApi = {
  /**
   * Get all news articles
   */
  getAll: async (): Promise<ApiResponse<NewsDTO[]>> => {
    const response = await apiClient.get<ApiResponse<NewsDTO[]>>(NEWS_ENDPOINT);
    return response.data;
  },

  /**
   * Get news by ID
   */
  getById: async (id: number): Promise<ApiResponse<NewsDTO>> => {
    const response = await apiClient.get<ApiResponse<NewsDTO>>(
      `${NEWS_ENDPOINT}/${id}`
    );
    return response.data;
  },

  /**
   * Get news by category
   */
  getByCategory: async (category: string): Promise<ApiResponse<NewsDTO[]>> => {
    const response = await apiClient.get<ApiResponse<NewsDTO[]>>(
      `${NEWS_ENDPOINT}/category/${category}`
    );
    return response.data;
  },

  /**
   * Get trending news
   */
  getTrending: async (): Promise<ApiResponse<NewsDTO[]>> => {
    const response = await apiClient.get<ApiResponse<NewsDTO[]>>(
      `${NEWS_ENDPOINT}/trending`
    );
    return response.data;
  },

  /**
   * Create a news article (Admin only)
   */
  create: async (data: NewsRequest): Promise<ApiResponse<NewsDTO>> => {
    const response = await apiClient.post<ApiResponse<NewsDTO>>(
      NEWS_ENDPOINT,
      data
    );
    return response.data;
  },

  /**
   * Update a news article (Admin only)
   */
  update: async (
    id: number,
    data: NewsRequest
  ): Promise<ApiResponse<NewsDTO>> => {
    const response = await apiClient.put<ApiResponse<NewsDTO>>(
      `${NEWS_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete a news article (Admin only)
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${NEWS_ENDPOINT}/${id}`
    );
    return response.data;
  }
};

export default newsApi;
