import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  href: string;
}

/** Link para o cabeçalho do dashboard. */
function DashboardHeaderLink({ href, children }: Props) {
  return (
    <Link href={href} className="p-1 text-slate-800 transition-colors hover:text-indigo-700 active:text-indigo-800">
      {children}
    </Link>
  );
}

export default DashboardHeaderLink;
