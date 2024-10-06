import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

function WorkspaceContentTitle({ children }: Props) {
  return <h3 className="text-2xl font-semibold">{children}</h3>;
}

export default WorkspaceContentTitle;
