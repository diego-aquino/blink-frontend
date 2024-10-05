'use client';

import SpinnerIcon from '@/components/icons/common/SpinnerIcon';
import useWorkspaces from '@/hooks/workspaces/useWorkspaces';

import WorkspaceContent from './[workspaceId]/layout/WorkspaceContent';
import WorkspaceContentTitle from './[workspaceId]/layout/WorkspaceContentTitle';
import WorkspaceItem from './WorkspaceItem';

function WorkspacesPage() {
  const workspaces = useWorkspaces();

  if (workspaces.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="h-7 w-7 text-indigo-400" />
      </div>
    );
  }

  if (workspaces.isError) {
    <WorkspaceContent>
      <p>Não foi possível carregar as áreas de trabalho.</p>
    </WorkspaceContent>;
  }

  return (
    <WorkspaceContent>
      <WorkspaceContentTitle>Minhas áreas de trabalho</WorkspaceContentTitle>

      <ul className="space-y-1">
        {workspaces.list.map((workspace) => (
          <WorkspaceItem key={workspace.id} workspace={workspace} />
        ))}

        {workspaces.list.length === 0 && <p>Você ainda não possui nenhuma área de trabalho.</p>}
      </ul>
    </WorkspaceContent>
  );
}

export default WorkspacesPage;
