import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from "@tanstack/react-query";
import { newsApi } from "@/services/news.service";
import type { ApiResponse, NewsDTO, NewsRequest } from "@/types/api.types";

// Query keys
export const newsKeys = {
  all: ["news"] as const,
  lists: () => [...newsKeys.all, "list"] as const,
  trending: () => [...newsKeys.all, "trending"] as const,
  category: (category: string) =>
    [...newsKeys.all, "category", category] as const,
  detail: (id: number) => [...newsKeys.all, "detail", id] as const
};

/**
 * Hook to get all news
 */
export const useNews = (
  options?: Omit<
    UseQueryOptions<ApiResponse<NewsDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: newsKeys.lists(),
    queryFn: newsApi.getAll,
    ...options
  });

/**
 * Hook to get trending news
 */
export const useTrendingNews = (
  options?: Omit<
    UseQueryOptions<ApiResponse<NewsDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: newsKeys.trending(),
    queryFn: newsApi.getTrending,
    ...options
  });

/**
 * Hook to get news by category
 */
export const useNewsByCategory = (
  category: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<NewsDTO[]>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: newsKeys.category(category),
    queryFn: () => newsApi.getByCategory(category),
    enabled: !!category,
    ...options
  });

/**
 * Hook to get news by ID
 */
export const useNewsById = (
  id: number,
  options?: Omit<
    UseQueryOptions<ApiResponse<NewsDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => newsApi.getById(id),
    enabled: !!id,
    ...options
  });

/**
 * Hook for creating news
 */
export const useCreateNews = (
  options?: UseMutationOptions<ApiResponse<NewsDTO>, Error, NewsRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.all });
    },
    ...options
  });
};

/**
 * Hook for updating news
 */
export const useUpdateNews = (
  options?: UseMutationOptions<
    ApiResponse<NewsDTO>,
    Error,
    { id: number; data: NewsRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => newsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.all });
    },
    ...options
  });
};

/**
 * Hook for deleting news
 */
export const useDeleteNews = (
  options?: UseMutationOptions<ApiResponse<void>, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.all });
    },
    ...options
  });
};
