import { useQuery } from '@tanstack/react-query';

import { Workspace } from '@/clients/backend/workspaces/types';

import useAPI from '../useAPI';
import { workspacesKey } from './useWorkspaces';
import { ensureWorkspaceId } from './utils';

function useWorkspace(workspaceId: Workspace['id'] | undefined) {
  const api = useAPI();

  const {
    data: workspace,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Workspace>({
    queryKey: workspacesKey.byId(workspaceId),
    queryFn() {
      const validWorkspaceId = ensureWorkspaceId(workspaceId);
      return api.backend.workspaces.get(validWorkspaceId);
    },
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
