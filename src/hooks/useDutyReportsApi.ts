import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from "@tanstack/react-query";
import { dutyReportApi } from "@/services/dutyReport.service";
import type {
  ApiResponse,
  DutyReportDTO,
  DutyReportFilterParams,
  DutyReportRequest,
  ReportStatus
} from "@/types/api.types";

// Query keys
export const dutyReportKeys = {
  all: ["dutyReports"] as const,
  lists: () => [...dutyReportKeys.all, "list"] as const,
  byStudent: (email: string) =>
    [...dutyReportKeys.all, "student", email] as const,
  bySchedule: (scheduleId: number) =>
    [...dutyReportKeys.all, "schedule", scheduleId] as const,
  filtered: (params: DutyReportFilterParams) =>
    [...dutyReportKeys.all, "filtered", params] as const,
  detail: (id: number) => [...dutyReportKeys.all, "detail", id] as const
};

/**
 * Hook to get all duty reports
 */
export const useDutyReports = (
  options?: Omit<
    UseQueryOptions<ApiResponse<DutyReportDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: dutyReportKeys.lists(),
    queryFn: dutyReportApi.getAll,
    ...options
  });

/**
 * Hook to get duty reports by student email
 */
export const useDutyReportsByStudent = (
  email: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<DutyReportDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: dutyReportKeys.byStudent(email),
    queryFn: () => dutyReportApi.getByStudentEmail(email),
    enabled: !!email,
    ...options
  });

/**
 * Hook to get duty reports by schedule ID
 */
export const useDutyReportsBySchedule = (
  scheduleId: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<DutyReportDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: dutyReportKeys.bySchedule(scheduleId),
    queryFn: () => dutyReportApi.getByScheduleId(scheduleId),
    enabled: !!scheduleId,
    ...options
  });

/**
 * Hook to get filtered duty reports
 */
export const useDutyReportsFiltered = (
  params: DutyReportFilterParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<DutyReportDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: dutyReportKeys.filtered(params),
    queryFn: () => dutyReportApi.getByFilters(params),
    ...options
  });

/**
 * Hook to get duty report by ID
 */
export const useDutyReport = (
  id: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<DutyReportDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: dutyReportKeys.detail(id),
    queryFn: () => dutyReportApi.getById(id),
    enabled: !!id,
    ...options
  });

/**
 * Hook for creating a duty report
 */
export const useCreateDutyReport = (
  options?: UseMutationOptions<
    ApiResponse<DutyReportDTO>,
    Error,
    DutyReportRequest
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dutyReportApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyReportKeys.all });
    },
    ...options
  });
};

/**
 * Hook for updating a duty report
 */
export const useUpdateDutyReport = (
  options?: UseMutationOptions<
    ApiResponse<DutyReportDTO>,
    Error,
    { id: number; data: DutyReportRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => dutyReportApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyReportKeys.all });
    },
    ...options
  });
};

/**
 * Hook for updating duty report status
 */
export const useUpdateDutyReportStatus = (
  options?: UseMutationOptions<
    ApiResponse<DutyReportDTO>,
    Error,
    { id: number; status: ReportStatus }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => dutyReportApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyReportKeys.all });
    },
    ...options
  });
};

/**
 * Hook for deleting a duty report
 */
export const useDeleteDutyReport = (
  options?: UseMutationOptions<ApiResponse<void>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dutyReportApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyReportKeys.all });
    },
    ...options
  });
};
