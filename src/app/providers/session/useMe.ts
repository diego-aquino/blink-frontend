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

interface Options {
  maxRetries?: number;
}

function useMe({ maxRetries = DEFAULT_RETRY_COUNT }: Options = {}) {
  const api = useAPI();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<User>({
    queryKey: meKey.all(),
    queryFn: () => api.backend.users.me(),
    retry(failureCount) {
      return failureCount < maxRetries;
    },
  });

  const invalidate = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: meKey.all() });
  }, [queryClient]);

  const clear = useCallback(() => {
    queryClient.removeQueries({ queryKey: meKey.all() });
  }, [queryClient]);

  return {
    user,
    isLoading,
    isSuccess,
    isError,
    invalidate,
    clear,
  };
}

export default useMe;
