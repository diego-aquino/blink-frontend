'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

import GearIcon from '@/components/icons/common/GearIcon';
import LinkIcon from '@/components/icons/common/LinkIcon';
import UsersIcon from '@/components/icons/common/UsersIcon';
import { cn } from '@/utils/html';

import useWorkspaceParams from '../hooks/useWorkspaceParams';
import { WorkspaceTab } from './WorkspaceLayout';

const ICONS_BY_TAB: Record<WorkspaceTab, ReactNode> = {
  blinks: <LinkIcon className="h-5 w-5" />,
  members: <UsersIcon className="h-5 w-5" />,
  settings: <GearIcon className="h-5 w-5" />,
};

const LABELS_BY_TAB: Record<WorkspaceTab, string> = {
  blinks: 'Blinks',
  members: 'Membros',
  settings: 'Configurações',
};

interface Props {
  tab: WorkspaceTab;
}

function WorkspaceSidebarLink({ tab }: Props) {
  const { workspaceId } = useWorkspaceParams();
  const pathname = usePathname();

  const isSelected =
    pathname.startsWith(`/workspaces/${workspaceId}/${tab}`) ||
    (tab === 'blinks' && pathname === `/workspaces/${workspaceId}`);

  const href = useMemo(() => {
    if (tab === 'blinks') {
      return `/workspaces/${workspaceId}`;
    } else {
      return `/workspaces/${workspaceId}/${tab}`;
    }
  }, [tab, workspaceId]);

  const icon = ICONS_BY_TAB[tab];
  const label = LABELS_BY_TAB[tab];

  return (
    <Link
      href={href}
      className={cn(
        'focus: flex h-10 items-center space-x-2 rounded-lg py-2 pl-4 pr-5 font-medium transition-colors before:-ml-2.5 before:mr-2 before:h-full before:w-1 before:rounded-full before:transition-colors hover:bg-indigo-50 active:bg-indigo-100',
        isSelected ? 'text-indigo-700 before:bg-indigo-400' : 'text-slate-800 before:bg-transparent',
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default WorkspaceSidebarLink;
