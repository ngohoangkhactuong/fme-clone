import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { type ReactNode } from "react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 1
    }
  }
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export { queryClient };
