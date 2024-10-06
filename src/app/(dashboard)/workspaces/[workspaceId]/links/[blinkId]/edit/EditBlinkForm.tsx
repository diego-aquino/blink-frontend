'use client';

import { Blink } from '@/clients/backend/workspaces/blinks/types';
import useBlinkUpdate from '@/hooks/workspaces/blinks/useBlinkUpdate';

import useWorkspaceParams from '../../../hooks/useWorkspaceParams';
import BlinkForm from '../../BlinkForm';
import useBlinkParams from '../hooks/useBlinkParams';

interface Props {
  blink: Blink;
}

function EditBlinkForm({ blink }: Props) {
  const { workspaceId } = useWorkspaceParams();
  const { blinkId } = useBlinkParams();

  const blinkUpdate = useBlinkUpdate(workspaceId, blinkId);

  return (
    <BlinkForm
      defaultName={blink.name}
      defaultURL={blink.url}
      defaultRedirectId={blink.redirectId}
      cancelHref={`/workspaces/${workspaceId}/links/${blinkId}`}
      onSubmit={(values) => blinkUpdate.run(values)}
    />
  );
}

export default EditBlinkForm;
