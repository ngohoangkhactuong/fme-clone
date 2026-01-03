import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from "@tanstack/react-query";
import { programApi } from "@/services/program.service";
import type {
  ApiResponse,
  ProgramDTO,
  ProgramRequest,
  ProgramType
} from "@/types/api.types";

// Query keys
export const programKeys = {
  all: ["programs"] as const,
  lists: () => [...programKeys.all, "list"] as const,
  type: (type: ProgramType) => [...programKeys.all, "type", type] as const,
  detail: (id: number) => [...programKeys.all, "detail", id] as const,
  code: (code: string) => [...programKeys.all, "code", code] as const
};

/**
 * Hook to get all programs
 */
export const usePrograms = (
  options?: Omit<
    UseQueryOptions<ApiResponse<ProgramDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: programKeys.lists(),
    queryFn: programApi.getAll,
    ...options
  });

/**
 * Hook to get programs by type
 */
export const useProgramsByType = (
  type: ProgramType,
  options?: Omit<
    UseQueryOptions<ApiResponse<ProgramDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: programKeys.type(type),
    queryFn: () => programApi.getByType(type),
    enabled: !!type,
    ...options
  });

/**
 * Hook to get program by ID
 */
export const useProgram = (
  id: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<ProgramDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: programKeys.detail(id),
    queryFn: () => programApi.getById(id),
    enabled: !!id,
    ...options
  });

/**
 * Hook to get program by code
 */
export const useProgramByCode = (
  code: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<ProgramDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: programKeys.code(code),
    queryFn: () => programApi.getByCode(code),
    enabled: !!code,
    ...options
  });

/**
 * Hook for creating a program
 */
export const useCreateProgram = (
  options?: UseMutationOptions<ApiResponse<ProgramDTO>, Error, ProgramRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: programApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programKeys.all });
    },
    ...options
  });
};

/**
 * Hook for updating a program
 */
export const useUpdateProgram = (
  options?: UseMutationOptions<
    ApiResponse<ProgramDTO>,
    Error,
    { id: number; data: ProgramRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => programApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programKeys.all });
    },
    ...options
  });
};

/**
 * Hook for deleting a program
 */
export const useDeleteProgram = (
  options?: UseMutationOptions<ApiResponse<void>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: programApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programKeys.all });
    },
    ...options
  });
};
