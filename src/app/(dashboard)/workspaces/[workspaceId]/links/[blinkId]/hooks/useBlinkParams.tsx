import { useParams } from 'next/navigation';

import { Blink } from '@/clients/backend/workspaces/blinks/types';

export interface BlinkParams extends Record<string, string | string[]> {
  blinkId: Blink['id'];
}

function useBlinkParams() {
  const { blinkId } = useParams<BlinkParams>() as Partial<BlinkParams>;

  return { blinkId };
}

export default useBlinkParams;
