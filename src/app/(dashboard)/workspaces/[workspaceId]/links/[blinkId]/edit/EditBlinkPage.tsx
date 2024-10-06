'use client';

import useBlink from '@/hooks/workspaces/blinks/useBlink';

import useWorkspaceParams, { WorkspaceParams } from '../../../hooks/useWorkspaceParams';
import WorkspaceContentHeader from '../../../layout/WorkspaceContentHeader';
import WorkspaceContentLoading from '../../../layout/WorkspaceContentLoading';
import useBlinkParams, { BlinkParams } from '../hooks/useBlinkParams';
import EditBlinkForm from './EditBlinkForm';

interface PageParams {
  params: WorkspaceParams & BlinkParams;
}

function EditBlinkPage({ params }: PageParams) {
  const { workspaceId } = useWorkspaceParams();
  const { blinkId } = useBlinkParams();

  const blink = useBlink(workspaceId, blinkId);

  if (blink.isLoading) {
    return <WorkspaceContentLoading />;
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

      <EditBlinkForm blink={blink.value} />
    </div>
  );
}

export default EditBlinkPage;
