'use client';

import useWorkspaces from '@/hooks/workspaces/useWorkspaces';

import WorkspaceItem from './WorkspaceItem';

function WorkspaceListPage() {
  const workspaces = useWorkspaces();

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-medium">Minhas áreas de trabalho</h2>

      {workspaces.isLoading && <p>Carregando...</p>}
      {workspaces.isError && <p>Não foi possível carregar as áreas de trabalho.</p>}

      {workspaces.isSuccess && (
        <ul className="space-y-1">
          {workspaces.list.map((workspace) => (
            <WorkspaceItem key={workspace.id} workspace={workspace} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default WorkspaceListPage;
