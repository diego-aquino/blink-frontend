'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import http from '@/clients/http';
import { WorkspaceGetResult } from '@/types/backend/workspaces';

interface PageParams extends Record<string, string | string[]> {
  workspaceId: string;
}

function WorkspacePage() {
  const { workspaceId } = useParams<PageParams>();

  const {
    data: workspace = null,
    isLoading: isLoadingWorkspace,
    isError: isErrorWorkspace,
    isSuccess: isSuccessWorkspace,
  } = useQuery({
    queryKey: ['workspaces', workspaceId],
    async queryFn() {
      const response = await http.backend.get<WorkspaceGetResult>(`/workspaces/${workspaceId}`);
      return response.data;
    },
  });

  return (
    <main>
      {isLoadingWorkspace && <p>Carregando...</p>}
      {isErrorWorkspace && <p>Não foi possível carregar a área de trabalho.</p>}

      {isSuccessWorkspace && workspace && (
        <>
          <h2 className="text-xl font-medium">{workspace.name}</h2>

          <p>Criado em: {new Date(workspace.createdAt).toLocaleString()}</p>
        </>
      )}
    </main>
  );
}

export default WorkspacePage;
