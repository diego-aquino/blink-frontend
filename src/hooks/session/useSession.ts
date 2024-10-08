import SessionContext from '@/providers/session/SessionContext';
import { useStrictContext } from '@/utils/react';

function useSession() {
  return useStrictContext('SessionContext', SessionContext);
}

export default useSession;
