import apiClient from "@/config/api.config";
import type {
  ApiResponse,
  DutyReportDTO,
  DutyReportFilterParams,
  DutyReportRequest,
  ReportStatus
} from "@/types/api.types";

const REPORT_ENDPOINT = "/reports";

export const dutyReportApi = {
  /**
   * Get all reports
   */
  getAll: async (): Promise<ApiResponse<DutyReportDTO[]>> => {
    const response =
      await apiClient.get<ApiResponse<DutyReportDTO[]>>(REPORT_ENDPOINT);
    return response.data;
  },

  /**
   * Get report by ID
   */
  getById: async (id: number): Promise<ApiResponse<DutyReportDTO>> => {
    const response = await apiClient.get<ApiResponse<DutyReportDTO>>(
      `${REPORT_ENDPOINT}/${id}`
    );
    return response.data;
  },

  /**
   * Get reports by student email
   */
  getByStudentEmail: async (
    email: string
  ): Promise<ApiResponse<DutyReportDTO[]>> => {
    const response = await apiClient.get<ApiResponse<DutyReportDTO[]>>(
      `${REPORT_ENDPOINT}/student/${email}`
    );
    return response.data;
  },

  /**
   * Get reports by schedule ID
   */
  getByScheduleId: async (
    scheduleId: number
  ): Promise<ApiResponse<DutyReportDTO[]>> => {
    const response = await apiClient.get<ApiResponse<DutyReportDTO[]>>(
      `${REPORT_ENDPOINT}/schedule/${scheduleId}`
    );
    return response.data;
  },

  /**
   * Get reports with filters
   */
  getByFilters: async (
    params: DutyReportFilterParams
  ): Promise<ApiResponse<DutyReportDTO[]>> => {
    const response = await apiClient.get<ApiResponse<DutyReportDTO[]>>(
      `${REPORT_ENDPOINT}/filter`,
      { params }
    );
    return response.data;
  },

  /**
   * Create a new report
   */
  create: async (
    data: DutyReportRequest
  ): Promise<ApiResponse<DutyReportDTO>> => {
    const response = await apiClient.post<ApiResponse<DutyReportDTO>>(
      REPORT_ENDPOINT,
      data
    );
    return response.data;
  },

  /**
   * Update a report
   */
  update: async (
    id: number,
    data: DutyReportRequest
  ): Promise<ApiResponse<DutyReportDTO>> => {
    const response = await apiClient.put<ApiResponse<DutyReportDTO>>(
      `${REPORT_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Update report status (Admin only)
   */
  updateStatus: async (
    id: number,
    status: ReportStatus
  ): Promise<ApiResponse<DutyReportDTO>> => {
    const response = await apiClient.put<ApiResponse<DutyReportDTO>>(
      `${REPORT_ENDPOINT}/${id}/status`,
      null,
      { params: { status } }
    );
    return response.data;
  },

  /**
   * Delete a report
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${REPORT_ENDPOINT}/${id}`
    );
    return response.data;
  }
};

export default dutyReportApi;
