import Link from 'next/link';
import { PropsWithChildren } from 'react';

import ChevronIcon from '@/components/icons/common/ChevronIcon';

import WorkspaceContentTitle from './WorkspaceContentTitle';

interface Props extends PropsWithChildren {
  title: string;
  returnHref?: string;
}

function WorkspaceContentHeader({ title, returnHref, children }: Props) {
  return (
    <header className="flex justify-between space-x-4">
      <WorkspaceContentTitle>
        {returnHref && (
          <Link
            href={returnHref}
            className="mb-3 flex items-center text-sm hover:text-indigo-700 active:text-indigo-800"
          >
            <ChevronIcon direction="left" className="h-5 w-5" />
            <span>Voltar</span>
          </Link>
        )}

        {title}
      </WorkspaceContentTitle>

      {children}
    </header>
  );
}

export default WorkspaceContentHeader;
