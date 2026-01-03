import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from "@tanstack/react-query";
import { authApi } from "@/services/auth.service";
import type {
  ApiResponse,
  AuthResponse,
  ChangePasswordRequest,
  SignInRequest,
  SignUpRequest,
  UpdateProfileRequest,
  UserDTO
} from "@/types/api.types";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const
};

/**
 * Hook to get current user profile
 */
export const useCurrentUser = (
  options?: Omit<
    UseQueryOptions<ApiResponse<UserDTO>, Error>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authApi.getCurrentUser,
    ...options
  });

/**
 * Hook for user sign in
 */
export const useSignIn = (
  options?: UseMutationOptions<ApiResponse<AuthResponse>, Error, SignInRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
    ...options
  });
};

/**
 * Hook for user sign up
 */
export const useSignUp = (
  options?: UseMutationOptions<ApiResponse<AuthResponse>, Error, SignUpRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
    ...options
  });
};

/**
 * Hook for updating user profile
 */
export const useUpdateProfile = (
  options?: UseMutationOptions<
    ApiResponse<UserDTO>,
    Error,
    UpdateProfileRequest
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
    ...options
  });
};

/**
 * Hook for changing password
 */
export const useChangePassword = (
  options?: UseMutationOptions<ApiResponse<void>, Error, ChangePasswordRequest>
) =>
  useMutation({
    mutationFn: authApi.changePassword,
    ...options
  });

/**
 * Hook for sign out
 */
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return () => {
    authApi.signOut();
    queryClient.clear();
  };
};
