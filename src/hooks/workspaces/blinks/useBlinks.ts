import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Blink, BlinkListResult } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

export const blinksKey = {
  all() {
    return ['blinks'] as const;
  },

  byWorkspaceId(workspaceId: Workspace['id'] | undefined) {
    return [...this.all(), workspaceId] as const;
  },

  byBlinkId(workspaceId: Workspace['id'] | undefined, blinkId: Blink['id'] | undefined) {
    return [...this.byWorkspaceId(workspaceId), blinkId] as const;
  },
};

const EMPTY_BLINK_LIST_RESULT: BlinkListResult = { blinks: [], total: 0 };

function useBlinks(workspaceId: Workspace['id'] | undefined, options: { enableFetch?: boolean } = {}) {
  const { enableFetch = true } = options;

  const api = useAPI();
  const queryClient = useQueryClient();

  const {
    data: { blinks, total } = EMPTY_BLINK_LIST_RESULT,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<BlinkListResult | undefined>({
    queryKey: blinksKey.byWorkspaceId(workspaceId),
    queryFn: () => (workspaceId ? api.backend.workspaces.blinks.list(workspaceId) : undefined),
    enabled: workspaceId !== undefined && enableFetch,
  });

  const optimisticRemove = useCallback(
    (blinkId: Blink['id']) => {
      const queryKey = blinksKey.byWorkspaceId(workspaceId);

      queryClient.setQueryData<BlinkListResult | undefined>(queryKey, (currentResult) => {
        if (!currentResult) {
          return currentResult;
        }

        return {
          blinks: currentResult.blinks.filter((blink) => blink.id !== blinkId),
          total: currentResult.total - 1,
        };
      });
    },
    [queryClient, workspaceId],
  );

  return {
    list: blinks,
    total,
    isLoading,
    isSuccess,
    isError,
    optimisticRemove,
  };
}

export default useBlinks;
