import { Workspace } from '@/clients/backend/workspaces/types';

export function ensureWorkspaceId(workspaceId: Workspace['id'] | undefined) {
  if (!workspaceId) {
    throw new Error(`Expected a workspace identifier, but got: ${workspaceId}`);
  }
  return workspaceId;
}
