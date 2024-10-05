import Link from 'next/link';

import { Workspace } from '@/clients/backend/workspaces/types';

interface Props {
  workspace: Workspace;
}

function WorkspaceItem({ workspace }: Props) {
  return (
    <Link
      href={`/workspaces/${workspace.id}`}
      className="block rounded-lg bg-white p-4 transition-colors hover:bg-indigo-100"
    >
      {workspace.name}
    </Link>
  );
}

export default WorkspaceItem;
