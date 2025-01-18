"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 5,
    },
  },
});

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
