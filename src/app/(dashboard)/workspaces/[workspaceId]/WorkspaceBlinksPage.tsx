'use client';

import Link from 'next/link';

import Button from '@/components/common/Button';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useBlinks from '@/hooks/workspaces/blinks/useBlinks';

import BlinkItem from './BlinkItem';
import useWorkspaceParams from './hooks/useWorkspaceParams';
import WorkspaceContentHeader from './layout/WorkspaceContentHeader';
import WorkspaceContentLoading from './layout/WorkspaceContentLoading';
import WorkspaceContentLoadingMore from './layout/WorkspaceContentLoadingMore';

function WorkspaceBlinksPage() {
  const { workspaceId } = useWorkspaceParams();
  const blinks = useBlinks(workspaceId);

  const blinksInfiniteScroll = useInfiniteScroll<HTMLUListElement>(
    { onRequestNextPage: blinks.loadMore, thresholdInPixels: 100 },
    [blinks.loadMore],
  );

  if (blinks.isLoading) {
    return <WorkspaceContentLoading />;
  }

  if (blinks.isError) {
    return <p>Não foi possível carregar os links.</p>;
  }

  return (
    <>
      <WorkspaceContentHeader title="Links">
        <Link href={`/workspaces/${workspaceId}/links/new`}>
          <Button>Novo link</Button>
        </Link>
      </WorkspaceContentHeader>

      {blinks.list.length > 0 && (
        <ul
          ref={blinksInfiniteScroll.ref}
          onScroll={blinksInfiniteScroll.onScroll}
          className="h-[calc(100vh-12rem)] space-y-2 overflow-y-auto px-1"
        >
          {blinks.list.map((blink) => (
            <BlinkItem key={blink.id} blink={blink} />
          ))}

          {blinks.isLoadingMore && <WorkspaceContentLoadingMore />}
        </ul>
      )}

      {blinks.list.length === 0 && <p>Esta área de trabalho ainda não possui nenhum link.</p>}
    </>
  );
}

export default WorkspaceBlinksPage;
