"use client";

import * as React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppDataProvider } from "@/context/AppDataContext";
import WalletProviders from "./WalletProviders";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProviders>
        <AppDataProvider>
          {children}
        </AppDataProvider>
      </WalletProviders>
    </QueryClientProvider>
  );
}
