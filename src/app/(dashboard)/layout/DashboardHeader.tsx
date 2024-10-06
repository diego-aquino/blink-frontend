'use client';

import { useMemo } from 'react';

import useWorkspace from '@/hooks/workspaces/useWorkspace';

import useWorkspaceParams from '../workspaces/[workspaceId]/hooks/useWorkspaceParams';
import DashboardHeaderBreadCrumbs, { Crumb } from './DashboardHeaderBreadCrumbs';
import DashboardHeaderProfile from './DashboardHeaderProfile';

function DashboardHeader() {
  const { workspaceId } = useWorkspaceParams();
  const workspace = useWorkspace(workspaceId);

  const headerBreadCrumbs = useMemo(() => {
    const crumbs: Crumb[] = [{ href: '/workspaces', label: 'Blink', size: 'lg' }];

    if (workspace.value) {
      crumbs.push({
        href: `/workspaces/${workspace.value.id}`,
        label: workspace.value.name,
      });
    }

    return crumbs;
  }, [workspace.value]);

  return (
    <header className="z-10 flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center space-x-1">
        <DashboardHeaderBreadCrumbs crumbs={headerBreadCrumbs} />
      </div>

      <DashboardHeaderProfile />
    </header>
  );
}

export default DashboardHeader;
