import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';

import { LoginCredentials } from '@/clients/backend/auth/AuthClient';
import useAPI from '@/hooks/useAPI';

import SessionContext, { SessionContextValue } from './SessionContext';
import useMe from './useMe';

type Props = PropsWithChildren;

function SessionProvider({ children }: Props) {
  const api = useAPI();

  const { user = null, isLoading, invalidate: invalidateUser, clear: clearUser } = useMe({ maxRetries: 0 });

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await api.backend.auth.login(credentials);
      await invalidateUser();
    },
    [api.backend.auth, invalidateUser],
  );

  useEffect(() => {
    api.backend.auth.on('sessionRefreshError', clearUser);

    return () => api.backend.auth.off('sessionRefreshError', clearUser);
  }, [api.backend.auth, clearUser]);

  const session = useMemo<SessionContextValue>(
    () => ({
      user,
      isLoading,
      login,
    }),
    [login, isLoading, user],
  );

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export default SessionProvider;
