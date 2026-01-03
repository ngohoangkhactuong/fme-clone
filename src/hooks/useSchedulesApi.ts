import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from "@tanstack/react-query";
import { scheduleApi } from "@/services/schedule.service";
import type {
  ApiResponse,
  DateRangeParams,
  ScheduleDTO,
  ScheduleRequest
} from "@/types/api.types";

// Query keys
export const scheduleKeys = {
  all: ["schedules"] as const,
  lists: () => [...scheduleKeys.all, "list"] as const,
  byDate: (date: string) => [...scheduleKeys.all, "date", date] as const,
  byDateRange: (startDate: string, endDate: string) =>
    [...scheduleKeys.all, "range", startDate, endDate] as const,
  byStudent: (email: string) =>
    [...scheduleKeys.all, "student", email] as const,
  detail: (id: number) => [...scheduleKeys.all, "detail", id] as const
};

/**
 * Hook to get all schedules
 */
export const useSchedules = (
  options?: Omit<
    UseQueryOptions<ApiResponse<ScheduleDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: scheduleKeys.lists(),
    queryFn: scheduleApi.getAll,
    ...options
  });

/**
 * Hook to get schedules by date
 */
export const useSchedulesByDate = (
  date: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<ScheduleDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: scheduleKeys.byDate(date),
    queryFn: () => scheduleApi.getByDate(date),
    enabled: !!date,
    ...options
  });

/**
 * Hook to get schedules by date range
 */
export const useSchedulesByDateRange = (
  params: DateRangeParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<ScheduleDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: scheduleKeys.byDateRange(params.startDate, params.endDate),
    queryFn: () => scheduleApi.getByDateRange(params),
    enabled: !!params.startDate && !!params.endDate,
    ...options
  });

/**
 * Hook to get schedules by student email
 */
export const useSchedulesByStudent = (
  email: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<ScheduleDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: scheduleKeys.byStudent(email),
    queryFn: () => scheduleApi.getByStudentEmail(email),
    enabled: !!email,
    ...options
  });

/**
 * Hook to get schedule by ID
 */
export const useSchedule = (
  id: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<ScheduleDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: scheduleKeys.detail(id),
    queryFn: () => scheduleApi.getById(id),
    enabled: !!id,
    ...options
  });

/**
 * Hook for creating a schedule
 */
export const useCreateSchedule = (
  options?: UseMutationOptions<ApiResponse<ScheduleDTO>, Error, ScheduleRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
    ...options
  });
};

/**
 * Hook for updating a schedule
 */
export const useUpdateSchedule = (
  options?: UseMutationOptions<
    ApiResponse<ScheduleDTO>,
    Error,
    { id: number; data: ScheduleRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => scheduleApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
    ...options
  });
};

/**
 * Hook for confirming a schedule
 */
export const useConfirmSchedule = (
  options?: UseMutationOptions<ApiResponse<ScheduleDTO>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.confirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
    ...options
  });
};

/**
 * Hook for deleting a schedule
 */
export const useDeleteSchedule = (
  options?: UseMutationOptions<ApiResponse<void>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
    ...options
  });
};
