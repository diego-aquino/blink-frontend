import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { User } from '@/clients/backend/users/UserClient';
import useAPI from '@/hooks/useAPI';

import { DEFAULT_RETRY_COUNT } from '../../providers/query/QueryProvider';

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

  const {
    data: user = null,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<User | null>({
    queryKey: meKey.all(),
    queryFn() {
      return api.backend.users.me();
    },
    retry(failureCount) {
      return failureCount < maxRetries;
    },
    enabled: enableFetch,
  });

  const invalidate = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: meKey.all() });
  }, [queryClient]);

  const clear = useCallback(() => {
    queryClient.setQueryData(meKey.all(), null);
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
