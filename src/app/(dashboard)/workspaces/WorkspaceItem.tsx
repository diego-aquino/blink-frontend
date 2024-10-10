import Link from 'next/link';

import { Workspace } from '@/clients/backend/workspaces/types';

interface Props {
  workspace: Workspace;
}

/** Componente representando um workspace na lista de workspaces. */
function WorkspaceItem({ workspace }: Props) {
  return (
    <Link
      href={`/workspaces/${workspace.id}`}
      className="block rounded-lg bg-white p-4 font-medium transition-colors hover:bg-indigo-100 active:bg-indigo-200"
    >
      {workspace.name}
    </Link>
  );
}

export default WorkspaceItem;
