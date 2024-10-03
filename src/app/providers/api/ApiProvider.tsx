import { PropsWithChildren, useMemo } from 'react';

import BackendClient from '@/clients/backend/BackendClient';

import ApiContext, { ApiContextValue } from './ApiContext';

type Props = PropsWithChildren;

function ApiProvider({ children }: Props) {
  const backendClient = useMemo(() => new BackendClient(), []);

  const api = useMemo<ApiContextValue>(
    () => ({
      backend: backendClient,
    }),
    [backendClient],
  );

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export default ApiProvider;
