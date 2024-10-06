'use client';

import { useMutation } from '@tanstack/react-query';

import { Blink } from '@/clients/backend/workspaces/blinks/types';
import useAPI from '@/hooks/useAPI';

import useWorkspaceParams from '../../../hooks/useWorkspaceParams';
import BlinkForm, { BlinkFormValues } from '../../BlinkForm';
import useBlinkParams from '../hooks/useBlinkParams';

interface Props {
  blink: Blink;
  onSuccess?: (updatedBlink: Blink) => void;
}

function EditBlinkForm({ blink, onSuccess }: Props) {
  const api = useAPI();

  const { workspaceId } = useWorkspaceParams();
  const { blinkId } = useBlinkParams();

  const submitBlinkEdit = useMutation({
    async mutationFn(values: BlinkFormValues) {
      if (!workspaceId) {
        throw new Error(`Expected a workspace identifier, but found ${workspaceId}.`);
      }
      if (!blinkId) {
        throw new Error(`Expected a blink identifier, but found ${blinkId}.`);
      }

      const updatedBlink = await api.backend.workspaces.blinks.edit(workspaceId, blinkId, {
        name: values.name,
        url: values.url,
        redirectId: values.redirectId,
      });

      return updatedBlink;
    },

    onSuccess,
  });

  return (
    <BlinkForm
      defaultName={blink.name}
      defaultURL={blink.url}
      defaultRedirectId={blink.redirectId}
      cancelHref={`/workspaces/${workspaceId}/links/${blinkId}`}
      onSubmit={(values) => submitBlinkEdit.mutateAsync(values)}
    />
  );
}

export default EditBlinkForm;
