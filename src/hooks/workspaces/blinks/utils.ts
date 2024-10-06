import { Blink } from '@/clients/backend/workspaces/blinks/types';

export function ensureBlinkId(blinkId: Blink['id'] | undefined) {
  if (!blinkId) {
    throw new Error(`Expected a blink identifier, but got: ${blinkId}`);
  }
  return blinkId;
}
