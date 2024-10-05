import WorkspaceSidebarLink from './WorkspaceSidebarLink';

function WorkspaceSidebar() {
  return (
    <aside className="flex h-full min-h-[calc(100vh-4rem)] flex-col space-y-1 bg-white px-2 py-4">
      <WorkspaceSidebarLink tab="blinks" />
      <WorkspaceSidebarLink tab="members" />
      <WorkspaceSidebarLink tab="settings" />
    </aside>
  );
}

export default WorkspaceSidebar;
