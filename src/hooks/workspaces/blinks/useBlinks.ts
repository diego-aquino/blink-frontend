import { useQuery } from '@tanstack/react-query';

import { BlinkListResult } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

export const blinksKey = {
  all() {
    return ['blinks'] as const;
  },

  byWorkspaceId(workspaceId: Workspace['id']) {
    return [...this.all(), workspaceId] as const;
  },
};

const EMPTY_BLINK_LIST_RESULT: BlinkListResult = { blinks: [], total: 0 };

function useBlinks(workspaceId: Workspace['id']) {
  const api = useAPI();

  const {
    data: { blinks, total } = EMPTY_BLINK_LIST_RESULT,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<BlinkListResult>({
    queryKey: blinksKey.all(),
    queryFn: () => api.backend.workspaces.blinks.listByWorkspace(workspaceId),
  });

  return {
    list: blinks,
    total,
    isLoading,
    isSuccess,
    isError,
  };
}

export default useBlinks;
