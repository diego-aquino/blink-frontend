import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Blink, BlinkListResult } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';

import { blinksKey } from './useBlinks';

function useBlinksOptimisticActions(workspaceId: Workspace['id'] | undefined) {
  const queryClient = useQueryClient();

  const createOptimistically = useCallback(
    (createdBlink: Blink) => {
      const queryKey = blinksKey.byWorkspaceId(workspaceId);

      queryClient.setQueryData<InfiniteData<BlinkListResult>>(queryKey, (infiniteData) => {
        if (!infiniteData) {
          return infiniteData;
        }

        return {
          pages: infiniteData.pages.map(({ blinks, total }) => ({
            blinks: [createdBlink, ...blinks],
            total: total + 1,
          })),
          pageParams: infiniteData.pageParams,
        };
      });
    },
    [queryClient, workspaceId],
  );

  const updateOptimistically = useCallback(
    (updatedBlink: Blink) => {
      const queryKey = blinksKey.byWorkspaceId(workspaceId);

      queryClient.setQueryData<InfiniteData<BlinkListResult>>(queryKey, (infiniteData) => {
        if (!infiniteData) {
          return infiniteData;
        }

        return {
          pages: infiniteData.pages.map(({ blinks, total }) => ({
            blinks: blinks.map((blink) => (blink.id === updatedBlink.id ? updatedBlink : blink)),
            total,
          })),
          pageParams: infiniteData.pageParams,
        };
      });
    },
    [queryClient, workspaceId],
  );

  const removeOptimistically = useCallback(
    (removedBlinkId: Blink['id']) => {
      const queryKey = blinksKey.byWorkspaceId(workspaceId);

      queryClient.setQueryData<InfiniteData<BlinkListResult>>(queryKey, (infiniteData) => {
        if (!infiniteData) {
          return infiniteData;
        }

        return {
          pages: infiniteData.pages.map(({ blinks, total }) => ({
            blinks: blinks.filter((blink) => blink.id !== removedBlinkId),
            total: total - 1,
          })),
          pageParams: infiniteData.pageParams,
        };
      });
    },
    [queryClient, workspaceId],
  );

  return {
    create: createOptimistically,
    update: updateOptimistically,
    remove: removeOptimistically,
  };
}

export default useBlinksOptimisticActions;
