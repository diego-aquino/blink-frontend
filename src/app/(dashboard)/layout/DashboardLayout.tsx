'use client';

import { PropsWithChildren } from 'react';

import withAuth from '@/components/auth/withAuth';

import DashboardHeader from './DashboardHeader';

type Props = PropsWithChildren;

function DashboardLayout({ children }: Props) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}

export default withAuth(DashboardLayout);
