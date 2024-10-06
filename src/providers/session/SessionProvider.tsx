'use client';

import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';

import { LoginCredentials } from '@/clients/backend/auth/AuthClient';
import useAPI from '@/hooks/useAPI';
import useMe, { meKey } from '@/hooks/users/useMe';

import SessionContext, { SessionContextValue } from './SessionContext';

type Props = PropsWithChildren;

function SessionProvider({ children }: Props) {
  const api = useAPI();
  const queryClient = useQueryClient();

  const { user, isLoading, invalidate: invalidateUser, clear: clearUser } = useMe({ maxRetries: 0 });

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await api.backend.auth.login(credentials);
      await invalidateUser();
    },
    [api.backend.auth, invalidateUser],
  );

  const logout = useCallback(async () => {
    try {
      await api.backend.auth.logout();
    } finally {
      clearUser();

      queryClient.removeQueries({
        predicate(query) {
          const isMeQuery = query.queryKey[0] === meKey.all()[0];
          return !isMeQuery;
        },
      });
    }
  }, [api.backend.auth, clearUser, queryClient]);

  useEffect(() => {
    api.backend.auth.on('sessionRefreshError', clearUser);

    return () => {
      api.backend.auth.off('sessionRefreshError', clearUser);
    };
  }, [api.backend.auth, clearUser]);

  const session = useMemo<SessionContextValue>(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export default SessionProvider;
