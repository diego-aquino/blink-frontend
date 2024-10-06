'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useAPI from '@/hooks/useAPI';

import useWorkspaceParams from '../../hooks/useWorkspaceParams';
import BlinkForm, { BlinkFormValues } from '../BlinkForm';

function CreateBlinkForm() {
  const api = useAPI();
  const router = useRouter();

  const { workspaceId } = useWorkspaceParams();

  const submitBlinkCreation = useMutation({
    async mutationFn(values: BlinkFormValues) {
      if (!workspaceId) {
        throw new Error(`Expected a workspace identifier, but found ${workspaceId}.`);
      }

      const createdBlink = await api.backend.workspaces.blinks.create(workspaceId, {
        name: values.name,
        url: values.url,
        redirectId: values.redirectId,
      });

      return createdBlink;
    },

    onSuccess(createdBlink) {
      router.push(`/workspaces/${workspaceId}/links/${createdBlink.id}`);
    },
  });

  return (
    <BlinkForm
      cancelHref={`/workspaces/${workspaceId}`}
      onSubmit={(values) => submitBlinkCreation.mutateAsync(values)}
    />
  );
}

export default CreateBlinkForm;
