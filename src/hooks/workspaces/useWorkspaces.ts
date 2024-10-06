import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { Workspace, WorkspaceListResult } from '@/clients/backend/workspaces/types';

import useAPI from '../useAPI';

export const workspacesKey = {
  all() {
    return ['workspaces'] as const;
  },

  byId(workspaceId: Workspace['id'] | undefined) {
    return [...this.all(), workspaceId] as const;
  },
};

interface WorkspaceListInfinitePageParam {
  page: number;
  limit: number;
}

const EMPTY_WORKSPACE_PAGES: WorkspaceListResult[] = [];
const DEFAULT_PAGE_SIZE = 10;

function useWorkspaces(options: { pageSize?: number } = {}) {
  const { pageSize = DEFAULT_PAGE_SIZE } = options;

  const api = useAPI();

  const initialPageParam = useMemo<WorkspaceListInfinitePageParam>(
    () => ({
      page: 1,
      limit: pageSize,
    }),
    [pageSize],
  );

  const {
    data: { pages: workspacePages = EMPTY_WORKSPACE_PAGES } = {},
    isLoading,
    isSuccess,
    isError,

    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    WorkspaceListResult,
    Error,
    InfiniteData<WorkspaceListResult>,
    QueryKey,
    WorkspaceListInfinitePageParam
  >({
    queryKey: workspacesKey.all(),
    queryFn({ pageParam: { page, limit } }) {
      return api.backend.workspaces.list({
        page: `${page}`,
        limit: `${limit}`,
      });
    },

    initialPageParam,
    getNextPageParam(lastPage, allPages) {
      const isFinished = lastPage.workspaces.length < pageSize;
      return isFinished ? undefined : { page: allPages.length + 1, limit: pageSize };
    },
  });

  const workspaces = useMemo(() => {
    return workspacePages.flatMap((page) => page.workspaces);
  }, [workspacePages]);

  const total = useMemo(() => {
    return workspacePages.length > 0 ? workspacePages[0].total : 0;
  }, [workspacePages]);

  const loadMore = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return {
    list: workspaces,
    total,
    loadMore,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    isSuccess,
    isError,
  };
}

export default useWorkspaces;
