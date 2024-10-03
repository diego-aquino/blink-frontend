'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PropsWithChildren, useCallback, useMemo } from 'react';

import { isUnauthenticatedResponse } from '@/clients/http';

const DEFAULT_RETRY_COUNT = 3;

type Props = PropsWithChildren;

function QueryProvider({ children }: Props) {
  const defaultQueryRetry = useCallback((failureCount: number, error: unknown) => {
    if (error instanceof AxiosError && error.response && isUnauthenticatedResponse(error.response)) {
      return false;
    }
    return failureCount < DEFAULT_RETRY_COUNT;
  }, []);

  const createQueryClient = useCallback(() => {
    return new QueryClient({
      defaultOptions: {
        queries: { retry: defaultQueryRetry },
      },
    });
  }, [defaultQueryRetry]);

  const queryClient = useMemo(() => createQueryClient(), [createQueryClient]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
