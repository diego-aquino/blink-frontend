'use client';

import { PropsWithChildren, useMemo } from 'react';

import BackendClient from '@/clients/backend/BackendClient';

import APIContext, { APIContextValue } from './APIContext';

type Props = PropsWithChildren;

/** Provedor de contexto da API e responsável por prover a instância do cliente de backend. */
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
