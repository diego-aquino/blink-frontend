import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

function DashboardContent({ children }: Props) {
  return <div className="mx-auto flex h-full min-h-[calc(100vh-4rem)] w-full max-w-4xl flex-col p-8">{children}</div>;
}

export default DashboardContent;
