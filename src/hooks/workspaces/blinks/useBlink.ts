import { useQuery } from '@tanstack/react-query';

import { Blink } from '@/clients/backend/workspaces/blinks/types';
import { Workspace } from '@/clients/backend/workspaces/types';
import useAPI from '@/hooks/useAPI';

import { ensureWorkspaceId } from '../utils';
import useBlinkOptimisticActions from './useBlinkOptimisticActions';
import { blinksKey } from './useBlinks';
import { ensureBlinkId } from './utils';

function useBlink(
  workspaceId: Workspace['id'] | undefined,
  blinkId: Blink['id'] | undefined,
  options: { enableFetch?: boolean } = {},
) {
  const { enableFetch = true } = options;

  const api = useAPI();

  const {
    data: workspace,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Blink>({
    queryKey: blinksKey.byBlinkId(workspaceId, blinkId),
    queryFn() {
      const validWorkspaceId = ensureWorkspaceId(workspaceId);
      const validBlinkId = ensureBlinkId(blinkId);

      return api.backend.workspaces.blinks.get(validWorkspaceId, validBlinkId);
    },
    enabled: workspaceId !== undefined && blinkId !== undefined && enableFetch,
  });

  const optimisticActions = useBlinkOptimisticActions(workspaceId, blinkId);

  return {
    value: workspace,
    isLoading,
    isSuccess,
    isError,
    createOptimistically: optimisticActions.create,
    updateOptimistically: optimisticActions.update,
    removeOptimistically: optimisticActions.remove,
  };
}

export default useBlink;
