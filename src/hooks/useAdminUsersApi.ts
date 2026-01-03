import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from "@tanstack/react-query";
import { adminUserApi } from "@/services/adminUser.service";
import type { ApiResponse, UserDTO } from "@/types/api.types";

// Query keys
export const adminUserKeys = {
  all: ["adminUsers"] as const,
  lists: () => [...adminUserKeys.all, "list"] as const,
  detail: (id: number) => [...adminUserKeys.all, "detail", id] as const
};

/**
 * Hook to get all users (Admin only)
 */
export const useAdminUsers = (
  options?: Omit<
    UseQueryOptions<ApiResponse<UserDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: adminUserKeys.lists(),
    queryFn: adminUserApi.getAll,
    ...options
  });

/**
 * Hook to get user by ID (Admin only)
 */
export const useAdminUser = (
  id: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<UserDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: adminUserKeys.detail(id),
    queryFn: () => adminUserApi.getById(id),
    enabled: !!id,
    ...options
  });

/**
 * Hook for deactivating a user (Admin only)
 */
export const useDeactivateUser = (
  options?: UseMutationOptions<ApiResponse<void>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminUserApi.deactivate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserKeys.all });
    },
    ...options
  });
};

/**
 * Hook for activating a user (Admin only)
 */
export const useActivateUser = (
  options?: UseMutationOptions<ApiResponse<void>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminUserApi.activate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserKeys.all });
    },
    ...options
  });
};
