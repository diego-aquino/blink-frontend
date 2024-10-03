import { useQuery } from '@tanstack/react-query';

import { Workspace } from '@/clients/backend/workspaces/WorkspaceClient';

import useAPI from '../useAPI';
import { workspacesKey } from './useWorkspaces';

function useWorkspace(workspaceId: Workspace['id']) {
  const api = useAPI();

  const {
    data: workspace,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Workspace>({
    queryKey: workspacesKey.byId(workspaceId),
    queryFn: () => api.backend.workspaces.get(workspaceId),
  });

  return {
    value: workspace,
    isLoading,
    isSuccess,
    isError,
  };
}

export default useWorkspace;
