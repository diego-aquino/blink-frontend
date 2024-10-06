'use client';

import Link from 'next/link';

import CopyToClipboardButton from '@/components/common/CopyToClipboardButton';
import IconButton from '@/components/common/IconButton';
import NewTabLink from '@/components/common/NewTabLink';
import ArrowIcon from '@/components/icons/common/ArrowIcon';
import CalendarIcon from '@/components/icons/common/CalendarIcon';
import ClockIcon from '@/components/icons/common/ClockIcon';
import EditIcon from '@/components/icons/common/EditIcon';
import LinkIcon from '@/components/icons/common/LinkIcon';
import TrashIcon from '@/components/icons/common/TrashIcon';
import useBlink from '@/hooks/workspaces/blinks/useBlink';
import useBlinkRemoval from '@/hooks/workspaces/blinks/useBlinkRemoval';
import { getBlinkShortURL, getBlinkTitle } from '@/utils/blinks';

import useWorkspaceParams from '../../hooks/useWorkspaceParams';
import WorkspaceContentHeader from '../../layout/WorkspaceContentHeader';
import WorkspaceContentLoading from '../../layout/WorkspaceContentLoading';
import useBlinkParams from './hooks/useBlinkParams';

function BlinkPage() {
  const { workspaceId } = useWorkspaceParams();
  const { blinkId } = useBlinkParams();

  const blink = useBlink(workspaceId, blinkId);
  const blinkRemoval = useBlinkRemoval(workspaceId, blinkId);

  if (blink.isLoading) {
    return <WorkspaceContentLoading />;
  }

  if (blink.isError || !blink.value) {
    return <p>Não foi possível carregar o link.</p>;
  }

  const formattedCreationTime = new Date(blink.value.createdAt).toLocaleString();
  const formattedUpdateTime = new Date(blink.value.updatedAt).toLocaleString();

  const shortURL = getBlinkShortURL(blink.value);

  return (
    <>
      <WorkspaceContentHeader title={getBlinkTitle(blink.value)}>
        <div className="flex flex-1 items-center justify-between space-x-8">
          <div className="flex flex-1 space-x-1">
            <CopyToClipboardButton text={shortURL} className="bg-white" />

            <Link href={`/workspaces/${workspaceId}/links/${blink.value.id}/edit`}>
              <IconButton variant="secondary" title="Editar" className="bg-white">
                <EditIcon className="h-5 w-5" />
              </IconButton>
            </Link>
          </div>

          <IconButton
            variant="danger"
            title="Remover"
            loading={blinkRemoval.isRunning}
            onClick={() => blinkRemoval.run()}
          >
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </WorkspaceContentHeader>

      <div className="space-y-4 rounded-lg bg-white p-4">
        <div className="flex items-center space-x-1 text-sm font-semibold">
          <LinkIcon className="h-5 w-5" />
          <NewTabLink href={shortURL} className="p-1 text-blue-600">
            {shortURL}
          </NewTabLink>

          <ArrowIcon className="h-5 w-5" />
          <NewTabLink href={blink.value.url} className="p-1 text-blue-600">
            {blink.value.url}
          </NewTabLink>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-sm">
            <CalendarIcon className="h-5 w-5" />
            <span className="text-slate-700">
              <b>Criado em</b>: {formattedCreationTime}
            </span>
          </div>

          <div className="flex items-center space-x-1 text-sm">
            <ClockIcon className="h-5 w-5" />
            <span className="text-slate-700">
              <b>Atualizado em</b>: {formattedUpdateTime}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlinkPage;
