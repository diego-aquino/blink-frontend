'use client';

import { PropsWithChildren } from 'react';

import APIProvider from './api/APIProvider';
import QueryProvider from './query/QueryProvider';
import SessionProvider from './session/SessionProvider';

type Props = PropsWithChildren;

function RootProvider({ children }: Props) {
  return (
    <QueryProvider>
      <APIProvider>
        <SessionProvider>{children}</SessionProvider>
      </APIProvider>
    </QueryProvider>
  );
}

export default RootProvider;
