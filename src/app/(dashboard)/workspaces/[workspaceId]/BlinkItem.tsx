import Link from 'next/link';

import { Blink } from '@/clients/backend/workspaces/blinks/types';
import ArrowIcon from '@/components/icons/common/ArrowIcon';
import CalendarIcon from '@/components/icons/common/CalendarIcon';
import LinkIcon from '@/components/icons/common/LinkIcon';
import { getBlinkShortURL, getBlinkTitle } from '@/utils/blinks';

interface Props {
  blink: Blink;
}

function BlinkItem({ blink }: Props) {
  const formattedCreationDate = new Date(blink.createdAt).toLocaleDateString();
  const formattedCreationTime = new Date(blink.createdAt).toLocaleString();

  return (
    <Link
      href={`/workspaces/${blink.workspaceId}/links/${blink.id}`}
      className="flex flex-col space-y-2 rounded-lg bg-white p-4 transition-colors hover:bg-indigo-100"
    >
      <h3 className="text-lg font-medium">{getBlinkTitle(blink)}</h3>

      <div className="space-y-1">
        <div className="flex items-center space-x-1 text-sm font-semibold">
          <LinkIcon className="h-5 w-5" />
          <span className="text-blue-600">{getBlinkShortURL(blink)}</span>
          <ArrowIcon className="h-5 w-5" />
          <span className="text-blue-600">{blink.url}</span>
        </div>

        <div className="flex items-center space-x-1 text-sm" title={`Criado em ${formattedCreationTime}`}>
          <CalendarIcon className="h-5 w-5" />
          <span className="text-slate-700">{formattedCreationDate}</span>
        </div>
      </div>
    </Link>
  );
}

export default BlinkItem;
