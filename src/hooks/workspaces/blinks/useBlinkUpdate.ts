import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Blink, BlinkUpdateInput } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

import { ensureWorkspaceId } from '../utils';
import useBlink from './useBlink';
import useBlinks from './useBlinks';
import { ensureBlinkId } from './utils';

function useBlinkUpdate(workspaceId: Workspace['id'] | undefined, blinkId: Blink['id'] | undefined) {
  const api = useAPI();
  const router = useRouter();

  const blinks = useBlinks(workspaceId, { enableFetch: false });
  const blink = useBlink(workspaceId, blinkId, { enableFetch: false });

  const updateMutation = useMutation({
    async mutationFn(input: BlinkUpdateInput) {
      const validWorkspaceId = ensureWorkspaceId(workspaceId);
      const validBlinkId = ensureBlinkId(blinkId);

      const updatedBlink = await api.backend.workspaces.blinks.edit(validWorkspaceId, validBlinkId, input);

      return updatedBlink;
    },

    onSuccess(updatedBlink) {
      blink.updateOptimistically(updatedBlink);
      blinks.updateOptimistically(updatedBlink);

      router.push(`/workspaces/${workspaceId}/links/${updatedBlink.id}`);
    },
  });

  return {
    run: updateMutation.mutateAsync,
    isRunning: updateMutation.isPending,
  };
}

export default useBlinkUpdate;
