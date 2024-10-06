import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { User } from '@/clients/backend/users/UserClient';
import useAPI from '@/hooks/useAPI';

import { DEFAULT_RETRY_COUNT } from '../QueryProvider';

export const meKey = {
  all() {
    return ['me'] as const;
  },
};

function useMe(
  options: {
    maxRetries?: number;
    enableFetch?: boolean;
  } = {},
) {
  const { maxRetries = DEFAULT_RETRY_COUNT, enableFetch = true } = options;

  const api = useAPI();
  const queryClient = useQueryClient();

  const queryFn = useCallback(() => {
    return api.backend.users.me();
  }, [api.backend.users]);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<User>({
    queryKey: meKey.all(),
    queryFn,
    retry(failureCount) {
      return failureCount < maxRetries;
    },
    enabled: enableFetch,
  });

  const prefetch = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: meKey.all(),
      queryFn,
    });
  }, [queryClient, queryFn]);

  const invalidate = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: meKey.all() });
  }, [queryClient]);

  const clear = useCallback(() => {
    queryClient.setQueryData(meKey.all(), undefined);
  }, [queryClient]);

  return {
    user,
    isLoading,
    isSuccess,
    isError,
    prefetch,
    invalidate,
    clear,
  };
}

export default useMe;
