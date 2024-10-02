'use client';

import { useQuery } from '@tanstack/react-query';

import http from '@/clients/http';
import { WorkspaceListResult } from '@/types/backend/workspaces';

import WorkspaceItem from './WorkspaceItem';

const EMPTY_WORKSPACE_LIST_RESULT: WorkspaceListResult = {
  workspaces: [],
  total: 0,
};

function WorkspaceListPage() {
  const {
    data: { workspaces } = EMPTY_WORKSPACE_LIST_RESULT,
    isLoading: isLoadingWorkspaces,
    isError: isErrorWorkspaces,
    isSuccess: isSuccessWorkspaces,
  } = useQuery({
    queryKey: ['workspaces'],
    async queryFn() {
      const response = await http.backend.get<WorkspaceListResult>('/workspaces');
      return response.data;
    },
  });

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-medium">Minhas áreas de trabalho</h2>

      {isLoadingWorkspaces && <p>Carregando...</p>}
      {isErrorWorkspaces && <p>Não foi possível carregar as áreas de trabalho.</p>}

      {isSuccessWorkspaces && (
        <ul className="space-y-1">
          {workspaces.map((workspace) => (
            <WorkspaceItem key={workspace.id} workspace={workspace} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default WorkspaceListPage;
