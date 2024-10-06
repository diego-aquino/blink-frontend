import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { Blink, BlinkListResult } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

import useBlinksOptimisticActions from './useBlinksOptimisticActions';

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

const EMPTY_BLINK_PAGES: BlinkListResult[] = [];
const EMPTY_BLINK_LIST_RESULT: BlinkListResult = { blinks: [], total: 0 };

const DEFAULT_PAGE_SIZE = 10;

function useBlinks(
  workspaceId: Workspace['id'] | undefined,
  options: { pageSize?: number; enableFetch?: boolean } = {},
) {
  const { pageSize = DEFAULT_PAGE_SIZE, enableFetch = true } = options;

  const api = useAPI();

  const initialPageParam = useMemo(() => ({ page: 1, limit: pageSize }), [pageSize]);

  const {
    data: { pages: blinkPages = EMPTY_BLINK_PAGES } = {},
    isLoading,
    isSuccess,
    isError,

    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    BlinkListResult,
    Error,
    InfiniteData<BlinkListResult>,
    QueryKey,
    { page: number; limit: number }
  >({
    queryKey: blinksKey.byWorkspaceId(workspaceId),
    queryFn({ pageParam: { page, limit } }) {
      if (!workspaceId) {
        return EMPTY_BLINK_LIST_RESULT;
      }

      return api.backend.workspaces.blinks.list(workspaceId, {
        page: `${page}`,
        limit: `${limit}`,
      });
    },

    initialPageParam,
    getNextPageParam(lastPage, allPages) {
      const isFinished = lastPage.blinks.length < pageSize;
      return isFinished ? undefined : { page: allPages.length + 1, limit: pageSize };
    },

    enabled: workspaceId !== undefined && enableFetch,
  });

  const blinks = useMemo(() => {
    return blinkPages.flatMap((page) => page.blinks);
  }, [blinkPages]);

  const total = useMemo(() => {
    return blinkPages.length > 0 ? blinkPages[0].total : 0;
  }, [blinkPages]);

  const optimisticActions = useBlinksOptimisticActions(workspaceId);

  const loadMore = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return {
    list: blinks,
    total,
    loadMore,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    isSuccess,
    isError,
    createOptimistically: optimisticActions.create,
    updateOptimistically: optimisticActions.update,
    removeOptimistically: optimisticActions.remove,
  };
}

export default useBlinks;
