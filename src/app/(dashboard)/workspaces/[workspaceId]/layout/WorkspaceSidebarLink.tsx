'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

import GearIcon from '@/components/icons/common/GearIcon';
import LinkIcon from '@/components/icons/common/LinkIcon';
import UsersIcon from '@/components/icons/common/UsersIcon';
import useQueryState from '@/hooks/useQueryState';
import { cn } from '@/utils/html';

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedTab, _setSelectedTab] = useQueryState<WorkspaceTab>('tab', 'blinks');
  const isSelected = selectedTab === tab;

  const href = useMemo(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (tab === 'blinks') {
      newSearchParams.delete('tab');
    } else {
      newSearchParams.set('tab', tab);
    }

    return `${pathname}?${newSearchParams.toString()}`;
  }, [pathname, searchParams, tab]);

  const icon = ICONS_BY_TAB[tab];
  const label = LABELS_BY_TAB[tab];

  return (
    <Link
      href={href}
      className={cn(
        'focus: flex items-center space-x-2 rounded-lg py-2 pl-4 pr-5 font-semibold transition-colors before:-ml-2.5 before:mr-2 before:h-full before:w-0.5 before:rounded-full before:transition-colors hover:bg-indigo-50 active:bg-indigo-100',
        isSelected ? 'text-indigo-700 before:bg-indigo-400' : 'text-slate-800 before:bg-transparent',
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default WorkspaceSidebarLink;
