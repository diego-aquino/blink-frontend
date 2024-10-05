import { useQuery } from '@tanstack/react-query';

import { Workspace } from '@/clients/backend/workspaces/types';

import useAPI from '../useAPI';
import { workspacesKey } from './useWorkspaces';

function useWorkspace(workspaceId: Workspace['id'] | undefined) {
  const api = useAPI();

  const {
    data: workspace,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Workspace | undefined>({
    queryKey: workspacesKey.byId(workspaceId),
    queryFn: () => (workspaceId ? api.backend.workspaces.get(workspaceId) : undefined),
    enabled: workspaceId !== undefined,
  });

  return {
    value: workspace,
    isLoading,
    isSuccess,
    isError,
  };
}

export default useWorkspace;
