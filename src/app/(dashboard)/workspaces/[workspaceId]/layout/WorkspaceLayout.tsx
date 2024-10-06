import { PropsWithChildren } from 'react';

import WorkspaceContent from './WorkspaceContent';
import WorkspaceSidebar from './WorkspaceSidebar';

export type WorkspaceTab = 'links' | 'members' | 'settings';

type Props = PropsWithChildren;

function WorkspaceLayout({ children }: Props) {
  return (
    <div className="flex">
      <WorkspaceSidebar />
      <WorkspaceContent>{children}</WorkspaceContent>
    </div>
  );
}

export default WorkspaceLayout;
