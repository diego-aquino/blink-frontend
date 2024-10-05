import { useParams } from 'next/navigation';

import { Workspace } from '@/clients/backend/workspaces/types';

export interface WorkspaceParams extends Record<string, string | string[]> {
  workspaceId: Workspace['id'];
}

function useWorkspaceParams() {
  const { workspaceId } = useParams<WorkspaceParams>() as Partial<WorkspaceParams>;

  return { workspaceId };
}

export default useWorkspaceParams;
