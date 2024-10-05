import Link from 'next/link';

import { Blink } from '@/clients/backend/workspaces/blinks/types';

interface Props {
  blink: Blink;
}

function BlinkItem({ blink }: Props) {
  return (
    <Link
      href={`/workspaces/${blink.workspaceId}/blinks/${blink.id}`}
      className="block rounded-lg bg-white p-4 transition-colors hover:bg-indigo-100"
    >
      {blink.name}
    </Link>
  );
}

export default BlinkItem;
