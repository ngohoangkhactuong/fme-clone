import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from "@tanstack/react-query";
import { bannerApi } from "@/services/banner.service";
import type { ApiResponse, BannerDTO, BannerRequest } from "@/types/api.types";

// Query keys
export const bannerKeys = {
  all: ["banners"] as const,
  lists: () => [...bannerKeys.all, "list"] as const,
  active: () => [...bannerKeys.all, "active"] as const,
  detail: (id: number) => [...bannerKeys.all, "detail", id] as const
};

/**
 * Hook to get all banners
 */
export const useBanners = (
  options?: Omit<
    UseQueryOptions<ApiResponse<BannerDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: bannerKeys.lists(),
    queryFn: bannerApi.getAll,
    ...options
  });

/**
 * Hook to get active banners
 */
export const useActiveBanners = (
  options?: Omit<
    UseQueryOptions<ApiResponse<BannerDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: bannerKeys.active(),
    queryFn: bannerApi.getActive,
    ...options
  });

/**
 * Hook to get banner by ID
 */
export const useBanner = (
  id: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<BannerDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: bannerKeys.detail(id),
    queryFn: () => bannerApi.getById(id),
    enabled: !!id,
    ...options
  });

/**
 * Hook for creating a banner
 */
export const useCreateBanner = (
  options?: UseMutationOptions<ApiResponse<BannerDTO>, Error, BannerRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bannerApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all });
    },
    ...options
  });
};

/**
 * Hook for updating a banner
 */
export const useUpdateBanner = (
  options?: UseMutationOptions<
    ApiResponse<BannerDTO>,
    Error,
    { id: number; data: BannerRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => bannerApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all });
    },
    ...options
  });
};

/**
 * Hook for deleting a banner
 */
export const useDeleteBanner = (
  options?: UseMutationOptions<ApiResponse<void>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bannerApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all });
    },
    ...options
  });
};
