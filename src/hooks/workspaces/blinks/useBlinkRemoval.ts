import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Blink } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

import { ensureWorkspaceId } from '../utils';
import useBlink from './useBlink';
import useBlinks from './useBlinks';
import { ensureBlinkId } from './utils';

function useBlinkRemoval(workspaceId: Workspace['id'] | undefined, blinkId: Blink['id'] | undefined) {
  const api = useAPI();
  const router = useRouter();

  const blinks = useBlinks(workspaceId, { enableFetch: false });
  const blink = useBlink(workspaceId, blinkId, { enableFetch: false });

  const removalMutation = useMutation({
    async mutationFn() {
      const validWorkspaceId = ensureWorkspaceId(workspaceId);
      const validBlinkId = ensureBlinkId(blinkId);

      await api.backend.workspaces.blinks.remove(validWorkspaceId, validBlinkId);

      return validBlinkId;
    },

    onSuccess(removedBlinkId) {
      blink.removeOptimistically();
      blinks.removeOptimistically(removedBlinkId);

      router.push(`/workspaces/${workspaceId}`);
    },
  });

  return {
    run: removalMutation.mutateAsync,
    isRunning: removalMutation.isPending,
  };
}

export default useBlinkRemoval;
