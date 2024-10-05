'use client';

import { useParams } from 'next/navigation';

import SpinnerIcon from '@/components/icons/common/SpinnerIcon';
import useBlinks from '@/hooks/workspaces/blinks/useBlinks';

import DashboardContent from '../../layout/DashboardContent';
import BlinkItem from './BlinkItem';

export interface PageParams extends Record<string, string | string[]> {
  workspaceId: string;
}

function WorkspacePage() {
  const { workspaceId } = useParams<PageParams>();
  const blinks = useBlinks(workspaceId);

  if (blinks.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="h-7 w-7 text-indigo-400" />
      </div>
    );
  }

  return (
    <DashboardContent>
      <main className="flex flex-1 flex-col space-y-4">
        {blinks.isError && <p>Não foi possível carregar os blinks.</p>}

        {blinks.isSuccess && (
          <>
            <h3 className="text-2xl font-medium">Blinks</h3>

            <ul className="space-y-1">
              {blinks.list.map((blink) => (
                <BlinkItem key={blink.id} blink={blink} />
              ))}
            </ul>
          </>
        )}
      </main>
    </DashboardContent>
  );
}

export default WorkspacePage;
