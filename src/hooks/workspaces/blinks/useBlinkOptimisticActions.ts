import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Blink } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';

import { blinksKey } from './useBlinks';

function useBlinkOptimisticActions(workspaceId: Workspace['id'] | undefined, blinkId: Blink['id'] | undefined) {
  const queryClient = useQueryClient();

  const createOptimistically = useCallback(
    (blink: Blink) => {
      const queryKey = blinksKey.byBlinkId(workspaceId, blink.id);
      queryClient.setQueryData<Blink>(queryKey, blink);
    },
    [queryClient, workspaceId],
  );

  const updateOptimistically = useCallback(
    (blink: Blink) => {
      const queryKey = blinksKey.byBlinkId(workspaceId, blinkId);
      queryClient.setQueryData<Blink>(queryKey, blink);
    },
    [blinkId, queryClient, workspaceId],
  );

  const removeOptimistically = useCallback(() => {
    const queryKey = blinksKey.byBlinkId(workspaceId, blinkId);
    queryClient.setQueryData<Blink>(queryKey, undefined);
  }, [blinkId, queryClient, workspaceId]);

  return {
    create: createOptimistically,
    update: updateOptimistically,
    remove: removeOptimistically,
  };
}

export default useBlinkOptimisticActions;
