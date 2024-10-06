import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Blink } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

import { blinksKey } from './useBlinks';

function useBlink(workspaceId: Workspace['id'] | undefined, blinkId: Blink['id'] | undefined) {
  const api = useAPI();
  const queryClient = useQueryClient();

  const {
    data: workspace,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Blink | undefined>({
    queryKey: blinksKey.byBlinkId(workspaceId, blinkId),
    queryFn: () => (workspaceId && blinkId ? api.backend.workspaces.blinks.get(workspaceId, blinkId) : undefined),
    enabled: workspaceId !== undefined && blinkId !== undefined,
  });

  const optimisticSet = useCallback(
    (blink: Blink) => {
      const queryKey = blinksKey.byBlinkId(workspaceId, blinkId);
      queryClient.setQueryData<Blink | undefined>(queryKey, blink);
    },
    [blinkId, queryClient, workspaceId],
  );

  const optimisticRemove = useCallback(() => {
    const queryKey = blinksKey.byBlinkId(workspaceId, blinkId);
    queryClient.setQueryData<Blink | undefined>(queryKey, undefined);
  }, [blinkId, queryClient, workspaceId]);

  return {
    value: workspace,
    isLoading,
    isSuccess,
    isError,
    optimisticSet,
    optimisticRemove,
  };
}

export default useBlink;
