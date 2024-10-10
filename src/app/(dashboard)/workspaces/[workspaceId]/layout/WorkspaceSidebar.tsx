import WorkspaceSidebarLink from './WorkspaceSidebarLink';

/** Barra lateral de uma página de um workspace, permitindo a navegação entre as abas. */
function WorkspaceSidebar() {
  return (
    <aside className="flex h-full min-h-[calc(100vh-4rem)] flex-col space-y-1 bg-white px-2 py-4">
      <WorkspaceSidebarLink tab="links" />
      <WorkspaceSidebarLink tab="members" />
      <WorkspaceSidebarLink tab="settings" />
    </aside>
  );
}

export default WorkspaceSidebar;
