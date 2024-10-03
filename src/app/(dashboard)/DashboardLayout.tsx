'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';

import withAuth from '@/components/auth/withAuth';

type Props = PropsWithChildren;

function DashboardLayout({ children }: Props) {
  return (
    <div>
      <header className="bg-white p-4 shadow-md">
        <Link href="/workspaces">
          <h1 className="text-2xl font-medium">Blink</h1>
        </Link>
      </header>

      <main className="p-8">{children}</main>
    </div>
  );
}

export default withAuth(DashboardLayout);
