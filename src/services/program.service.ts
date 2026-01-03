import apiClient from "@/config/api.config";
import type {
  ApiResponse,
  ProgramDTO,
  ProgramRequest,
  ProgramType
} from "@/types/api.types";

const PROGRAM_ENDPOINT = "/programs";

export const programApi = {
  /**
   * Get all programs
   */
  getAll: async (): Promise<ApiResponse<ProgramDTO[]>> => {
    const response =
      await apiClient.get<ApiResponse<ProgramDTO[]>>(PROGRAM_ENDPOINT);
    return response.data;
  },

  /**
   * Get program by ID
   */
  getById: async (id: number): Promise<ApiResponse<ProgramDTO>> => {
    const response = await apiClient.get<ApiResponse<ProgramDTO>>(
      `${PROGRAM_ENDPOINT}/${id}`
    );
    return response.data;
  },

  /**
   * Get program by code
   */
  getByCode: async (code: string): Promise<ApiResponse<ProgramDTO>> => {
    const response = await apiClient.get<ApiResponse<ProgramDTO>>(
      `${PROGRAM_ENDPOINT}/code/${code}`
    );
    return response.data;
  },

  /**
   * Get programs by type
   */
  getByType: async (type: ProgramType): Promise<ApiResponse<ProgramDTO[]>> => {
    const response = await apiClient.get<ApiResponse<ProgramDTO[]>>(
      `${PROGRAM_ENDPOINT}/type/${type}`
    );
    return response.data;
  },

  /**
   * Create a program (Admin only)
   */
  create: async (data: ProgramRequest): Promise<ApiResponse<ProgramDTO>> => {
    const response = await apiClient.post<ApiResponse<ProgramDTO>>(
      PROGRAM_ENDPOINT,
      data
    );
    return response.data;
  },

  /**
   * Update a program (Admin only)
   */
  update: async (
    id: number,
    data: ProgramRequest
  ): Promise<ApiResponse<ProgramDTO>> => {
    const response = await apiClient.put<ApiResponse<ProgramDTO>>(
      `${PROGRAM_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete a program (Admin only)
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${PROGRAM_ENDPOINT}/${id}`
    );
    return response.data;
  }
};

export default programApi;
