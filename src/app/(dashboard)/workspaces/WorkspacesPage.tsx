'use client';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useWorkspaces from '@/hooks/workspaces/useWorkspaces';

import WorkspaceContent from './[workspaceId]/layout/WorkspaceContent';
import WorkspaceContentLoading from './[workspaceId]/layout/WorkspaceContentLoading';
import WorkspaceContentLoadingMore from './[workspaceId]/layout/WorkspaceContentLoadingMore';
import WorkspaceContentTitle from './[workspaceId]/layout/WorkspaceContentTitle';
import WorkspaceItem from './WorkspaceItem';

/** Página que lista as áreas de trabalho do usuário. */
function WorkspacesPage() {
  const workspaces = useWorkspaces();

  const workspacesInfiniteScroll = useInfiniteScroll<HTMLUListElement>(
    { onRequestNextPage: workspaces.loadMore, thresholdInPixels: 100 },
    [workspaces.loadMore],
  );

  if (workspaces.isLoading) {
    return <WorkspaceContentLoading />;
  }

  if (workspaces.isError) {
    <WorkspaceContent>
      <p>Não foi possível carregar as áreas de trabalho.</p>
    </WorkspaceContent>;
  }

  return (
    <WorkspaceContent>
      <WorkspaceContentTitle>Minhas áreas de trabalho</WorkspaceContentTitle>

      {workspaces.list.length > 0 && (
        <ul
          ref={workspacesInfiniteScroll.ref}
          onScroll={workspacesInfiniteScroll.onScroll}
          className="h-[calc(100vh-12rem)] space-y-2 overflow-y-auto px-1"
        >
          {workspaces.list.map((workspace) => (
            <WorkspaceItem key={workspace.id} workspace={workspace} />
          ))}

          {workspaces.isLoadingMore && <WorkspaceContentLoadingMore />}
        </ul>
      )}

      {workspaces.list.length === 0 && <p>Você ainda não possui nenhuma área de trabalho.</p>}
    </WorkspaceContent>
  );
}

export default WorkspacesPage;
