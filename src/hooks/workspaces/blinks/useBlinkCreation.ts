import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { BlinkCreationInput } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

import { ensureWorkspaceId } from '../utils';
import useBlink from './useBlink';
import useBlinks from './useBlinks';

function useBlinkCreation(workspaceId: Workspace['id'] | undefined) {
  const api = useAPI();
  const router = useRouter();

  const blinks = useBlinks(workspaceId, { enableFetch: false });
  const blink = useBlink(workspaceId, undefined, { enableFetch: false });

  const creationMutation = useMutation({
    async mutationFn(input: BlinkCreationInput) {
      const validWorkspaceId = ensureWorkspaceId(workspaceId);
      const createdBlink = await api.backend.workspaces.blinks.create(validWorkspaceId, input);

      return createdBlink;
    },

    onSuccess(createdBlink) {
      blink.createOptimistically(createdBlink);
      blinks.createOptimistically(createdBlink);

      router.push(`/workspaces/${workspaceId}/links/${createdBlink.id}`);
    },
  });

  return {
    run: creationMutation.mutateAsync,
    isRunning: creationMutation.isPending,
  };
}

export default useBlinkCreation;
