'use client';

import { useParams } from 'next/navigation';

import useWorkspace from '@/hooks/workspaces/useWorkspace';

interface PageParams extends Record<string, string | string[]> {
  workspaceId: string;
}

function WorkspacePage() {
  const { workspaceId } = useParams<PageParams>();
  const workspace = useWorkspace(workspaceId);

  return (
    <main>
      {workspace.isLoading && <p>Carregando...</p>}
      {workspace.isError && <p>Não foi possível carregar a área de trabalho.</p>}

      {workspace.isSuccess && workspace.value && (
        <>
          <h2 className="text-xl font-medium">{workspace.value.name}</h2>
          <p>Criado em: {new Date(workspace.value.createdAt).toLocaleString()}</p>
        </>
      )}
    </main>
  );
}

export default WorkspacePage;
