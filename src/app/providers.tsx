"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { MantineProvider } from "@mantine/core";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MantineProvider>
      {/* Your app here */}
      <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
    </MantineProvider>
  );
}
