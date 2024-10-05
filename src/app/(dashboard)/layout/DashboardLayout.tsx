'use client';

import { PropsWithChildren, useMemo } from 'react';

import withAuth from '@/components/auth/withAuth';
import useWorkspace from '@/hooks/workspaces/useWorkspace';

import useWorkspaceParams from '../workspaces/[workspaceId]/hooks/useWorkspaceParams';
import DashboardHeaderBreadCrumbs, { Crumb } from './DashboardHeaderBreadCrumbs';

type Props = PropsWithChildren;

function DashboardLayout({ children }: Props) {
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
    <>
      <header className="z-10 bg-white p-4 shadow-md">
        <div className="flex items-center space-x-1">
          <DashboardHeaderBreadCrumbs crumbs={headerBreadCrumbs} />
        </div>
      </header>

      {children}
    </>
  );
}

export default withAuth(DashboardLayout);
