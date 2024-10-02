'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useMemo } from 'react';

type Props = PropsWithChildren;

function RootProviders({ children }: Props) {
  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default RootProviders;
