import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

function DashboardLayout({ children }: Props) {
  return (
    <div className="">
      <header className="bg-white p-4 shadow-md">
        <Link href="/workspaces">
          <h1 className="text-2xl font-medium">Blink</h1>
        </Link>
      </header>

      <main className="p-8">{children}</main>
    </div>
  );
}

export default DashboardLayout;
