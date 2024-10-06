'use client';

import { useRouter } from 'next/navigation';

import SpinnerIcon from '@/components/icons/common/SpinnerIcon';
import useBlink from '@/hooks/workspaces/blinks/useBlink';

import useWorkspaceParams, { WorkspaceParams } from '../../../hooks/useWorkspaceParams';
import WorkspaceContentHeader from '../../../layout/WorkspaceContentHeader';
import useBlinkParams, { BlinkParams } from '../hooks/useBlinkParams';
import EditBlinkForm from './EditBlinkForm';

interface PageParams {
  params: WorkspaceParams & BlinkParams;
}

function EditBlinkPage({ params }: PageParams) {
  const router = useRouter();

  const { workspaceId } = useWorkspaceParams();
  const { blinkId } = useBlinkParams();

  const blink = useBlink(workspaceId, blinkId);

  if (blink.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="h-7 w-7 text-indigo-400" />
      </div>
    );
  }

  if (blink.isError || !blink.value) {
    return <p>Não foi possível carregar o link.</p>;
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <WorkspaceContentHeader
        title="Editar Link"
        returnHref={`/workspaces/${params.workspaceId}/links/${params.blinkId}`}
      />

      <EditBlinkForm
        blink={blink.value}
        onSuccess={(updatedBlink) => {
          blink.optimisticSet(updatedBlink);
          router.push(`/workspaces/${workspaceId}/links/${updatedBlink.id}`);
        }}
      />
    </div>
  );
}

export default EditBlinkPage;
