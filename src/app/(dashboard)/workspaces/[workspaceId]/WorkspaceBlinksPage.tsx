'use client';

import Link from 'next/link';

import Button from '@/components/common/Button';
import SpinnerIcon from '@/components/icons/common/SpinnerIcon';
import useBlinks from '@/hooks/workspaces/blinks/useBlinks';

import BlinkItem from './BlinkItem';
import useWorkspaceParams from './hooks/useWorkspaceParams';
import WorkspaceContentHeader from './layout/WorkspaceContentHeader';

function WorkspaceBlinksPage() {
  const { workspaceId } = useWorkspaceParams();
  const blinks = useBlinks(workspaceId);

  if (blinks.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="h-7 w-7 text-indigo-400" />
      </div>
    );
  }

  if (blinks.isError) {
    return <p>Não foi possível carregar os blinks.</p>;
  }

  return (
    <>
      <WorkspaceContentHeader title="Links">
        <Link href={`/workspaces/${workspaceId}/link/new`}>
          <Button>Novo link</Button>
        </Link>
      </WorkspaceContentHeader>

      {blinks.list.length > 0 ? (
        <ul className="space-y-2">
          {blinks.list.map((blink) => (
            <BlinkItem key={blink.id} blink={blink} />
          ))}
        </ul>
      ) : (
        <p>Esta área de trabalho ainda não possui nenhum link.</p>
      )}
    </>
  );
}

export default WorkspaceBlinksPage;
