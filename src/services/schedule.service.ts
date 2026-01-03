import apiClient from "@/config/api.config";
import type {
  ApiResponse,
  DateRangeParams,
  ScheduleDTO,
  ScheduleRequest
} from "@/types/api.types";

const SCHEDULE_ENDPOINT = "/schedules";

export const scheduleApi = {
  /**
   * Get all schedules
   */
  getAll: async (): Promise<ApiResponse<ScheduleDTO[]>> => {
    const response =
      await apiClient.get<ApiResponse<ScheduleDTO[]>>(SCHEDULE_ENDPOINT);
    return response.data;
  },

  /**
   * Get schedule by ID
   */
  getById: async (id: number): Promise<ApiResponse<ScheduleDTO>> => {
    const response = await apiClient.get<ApiResponse<ScheduleDTO>>(
      `${SCHEDULE_ENDPOINT}/${id}`
    );
    return response.data;
  },

  /**
   * Get schedules by date (format: YYYY-MM-DD)
   */
  getByDate: async (date: string): Promise<ApiResponse<ScheduleDTO[]>> => {
    const response = await apiClient.get<ApiResponse<ScheduleDTO[]>>(
      `${SCHEDULE_ENDPOINT}/date/${date}`
    );
    return response.data;
  },

  /**
   * Get schedules by date range
   */
  getByDateRange: async (
    params: DateRangeParams
  ): Promise<ApiResponse<ScheduleDTO[]>> => {
    const response = await apiClient.get<ApiResponse<ScheduleDTO[]>>(
      `${SCHEDULE_ENDPOINT}/range`,
      { params }
    );
    return response.data;
  },

  /**
   * Get schedules by student email
   */
  getByStudentEmail: async (
    email: string
  ): Promise<ApiResponse<ScheduleDTO[]>> => {
    const response = await apiClient.get<ApiResponse<ScheduleDTO[]>>(
      `${SCHEDULE_ENDPOINT}/student/${email}`
    );
    return response.data;
  },

  /**
   * Create a new schedule (Admin only)
   */
  create: async (data: ScheduleRequest): Promise<ApiResponse<ScheduleDTO>> => {
    const response = await apiClient.post<ApiResponse<ScheduleDTO>>(
      SCHEDULE_ENDPOINT,
      data
    );
    return response.data;
  },

  /**
   * Update a schedule (Admin only)
   */
  update: async (
    id: number,
    data: ScheduleRequest
  ): Promise<ApiResponse<ScheduleDTO>> => {
    const response = await apiClient.put<ApiResponse<ScheduleDTO>>(
      `${SCHEDULE_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Confirm a schedule (Admin only)
   */
  confirm: async (id: number): Promise<ApiResponse<ScheduleDTO>> => {
    const response = await apiClient.put<ApiResponse<ScheduleDTO>>(
      `${SCHEDULE_ENDPOINT}/${id}/confirm`
    );
    return response.data;
  },

  /**
   * Delete a schedule (Admin only)
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${SCHEDULE_ENDPOINT}/${id}`
    );
    return response.data;
  }
};

export default scheduleApi;
