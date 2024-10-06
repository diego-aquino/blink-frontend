'use client';

import { PropsWithChildren, useMemo } from 'react';

import BackendClient from '@/clients/backend/BackendClient';

import APIContext, { APIContextValue } from './APIContext';

type Props = PropsWithChildren;

function APIProvider({ children }: Props) {
  const backendClient = useMemo(() => new BackendClient(), []);

  const api = useMemo<APIContextValue>(
    () => ({
      backend: backendClient,
    }),
    [backendClient],
  );

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
}

export default APIProvider;
