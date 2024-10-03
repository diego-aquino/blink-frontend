'use client';

import { PropsWithChildren } from 'react';

import ApiProvider from './api/ApiProvider';
import QueryProvider from './QueryProvider';

type Props = PropsWithChildren;

function RootProvider({ children }: Props) {
  return (
    <QueryProvider>
      <ApiProvider>{children}</ApiProvider>
    </QueryProvider>
  );
}

export default RootProvider;
