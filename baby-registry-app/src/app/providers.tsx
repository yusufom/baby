"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "react-query";
import { useState } from "react";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
}
