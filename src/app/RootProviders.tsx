'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PropsWithChildren, useMemo } from 'react';

import { isUnauthenticatedResponse } from '@/clients/http';

const DEFAULT_RETRY_COUNT = 3;

type Props = PropsWithChildren;

function RootProviders({ children }: Props) {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry(failureCount, error) {
            if (error instanceof AxiosError && error.response && isUnauthenticatedResponse(error.response)) {
              return false;
            }
            return failureCount < DEFAULT_RETRY_COUNT;
          },
        },
      },
    });
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default RootProviders;
