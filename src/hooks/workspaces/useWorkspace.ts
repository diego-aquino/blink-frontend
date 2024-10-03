import { useQuery } from '@tanstack/react-query';

import { Workspace } from '@/clients/backend/workspaces/WorkspaceClient';

import useApi from '../useApi';
import { workspacesKey } from './useWorkspaces';

function useWorkspace(workspaceId: Workspace['id']) {
  const api = useApi();

  const {
    data: workspace,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
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
