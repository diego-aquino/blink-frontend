import { Blink } from '@/clients/backend/workspaces/blinks/types';
import environment from '@/config/environment';

export function getBlinkTitle(blink: Blink) {
  return (blink.name ?? '') || blink.redirectId;
}

export function getBlinkShortURL(blink: Blink) {
  return `${environment.NEXT_PUBLIC_BACKEND_URL}/${blink.redirectId}`;
}
