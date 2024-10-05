import { PropsWithChildren } from 'react';

import WorkspaceSidebarLink from './WorkspaceSidebarLink';

export type WorkspaceTab = 'blinks' | 'members' | 'settings';

type Props = PropsWithChildren;

function WorkspaceLayout({ children }: Props) {
  return (
    <div className="flex">
      <aside className="flex h-full min-h-[calc(100vh-4rem)] flex-col space-y-1 bg-white px-2 py-4">
        <WorkspaceSidebarLink tab="blinks" />
        <WorkspaceSidebarLink tab="members" />
        <WorkspaceSidebarLink tab="settings" />
      </aside>

      {children}
    </div>
  );
}

export default WorkspaceLayout;
