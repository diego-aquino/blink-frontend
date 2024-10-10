'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PropsWithChildren, useCallback, useMemo } from 'react';

import AuthClient from '@/clients/backend/auth/AuthClient';

export const DEFAULT_RETRY_COUNT = 3;

type Props = PropsWithChildren;

/** Provedor de contexto de queries e responsável por configurar o @tanstack/query client na aplicação. */
function QueryProvider({ children }: Props) {
  const defaultQueryRetry = useCallback((failureCount: number, error: unknown) => {
    const isKnownError =
      error instanceof AxiosError && error.response && AuthClient.isUnauthenticatedResponse(error.response);

    if (isKnownError) {
      return false;
    }

    return failureCount < DEFAULT_RETRY_COUNT;
  }, []);

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: { retry: defaultQueryRetry },
      },
    });
  }, [defaultQueryRetry]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
