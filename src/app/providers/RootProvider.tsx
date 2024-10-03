'use client';

import { PropsWithChildren } from 'react';

import QueryProvider from './QueryProvider';

type Props = PropsWithChildren;

function RootProvider({ children }: Props) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default RootProvider;
