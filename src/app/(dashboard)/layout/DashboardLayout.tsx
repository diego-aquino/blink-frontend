'use client';

import { useParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

import withAuth from '@/components/auth/withAuth';
import ChevronIcon from '@/components/icons/common/ChevronIcon';
import useWorkspace from '@/hooks/workspaces/useWorkspace';

import { PageParams as WorkspacePageParams } from '../workspaces/[workspaceId]/WorkspacePage';
import DashboardHeaderLink from './DashboardHeaderLink';

type Props = PropsWithChildren;

function DashboardLayout({ children }: Props) {
  const { workspaceId } = useParams<WorkspacePageParams>();
  const workspace = useWorkspace(workspaceId);

  return (
    <>
      <header className="z-10 bg-white p-4 shadow-md">
        <div className="flex items-center space-x-1">
          <DashboardHeaderLink href="/workspaces">
            <h1 className="text-2xl font-medium">Blink</h1>
          </DashboardHeaderLink>

          {workspace.value && (
            <>
              <ChevronIcon className="h-7 w-7 text-indigo-400" />

              <DashboardHeaderLink href={`/workspaces/${workspace.value.id}`}>
                <h2 className="text-lg font-medium">{workspace.value.name}</h2>
              </DashboardHeaderLink>
            </>
          )}
        </div>
      </header>

      {children}
    </>
  );
}

export default withAuth(DashboardLayout);
