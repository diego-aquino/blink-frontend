'use client';

import SpinnerIcon from '@/components/icons/common/SpinnerIcon';
import useWorkspaces from '@/hooks/workspaces/useWorkspaces';

import DashboardContent from '../layout/DashboardContent';
import WorkspaceItem from './WorkspaceItem';

function WorkspaceListPage() {
  const workspaces = useWorkspaces();

  if (workspaces.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="h-7 w-7 text-indigo-400" />
      </div>
    );
  }

  return (
    <DashboardContent>
      <main className="flex flex-1 flex-col space-y-4">
        {workspaces.isError && <p>Não foi possível carregar as áreas de trabalho.</p>}

        {workspaces.isSuccess && (
          <>
            <h2 className="text-xl font-medium">Minhas áreas de trabalho</h2>

            <ul className="space-y-1">
              {workspaces.list.map((workspace) => (
                <WorkspaceItem key={workspace.id} workspace={workspace} />
              ))}
            </ul>
          </>
        )}
      </main>
    </DashboardContent>
  );
}

export default WorkspaceListPage;
