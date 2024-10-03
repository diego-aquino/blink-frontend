import { useQuery } from '@tanstack/react-query';

import { Workspace, WorkspaceListResult } from '@/clients/backend/workspaces/WorkspaceClient';

import useApi from '../useApi';

export const workspacesKey = {
  all() {
    return ['workspaces'] as const;
  },

  byId(workspaceId: Workspace['id']) {
    return [...this.all(), workspaceId] as const;
  },
};

const EMPTY_WORKSPACE_LIST_RESULT: WorkspaceListResult = { workspaces: [], total: 0 };

function useWorkspaces() {
  const api = useApi();

  const {
    data: { workspaces, total } = EMPTY_WORKSPACE_LIST_RESULT,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: workspacesKey.all(),
    queryFn: () => api.backend.workspaces.list(),
  });

  return {
    list: workspaces,
    total,
    isLoading,
    isSuccess,
    isError,
  };
}

export default useWorkspaces;
