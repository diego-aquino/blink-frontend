import { PropsWithChildren } from 'react';

import DashboardContent from '@/app/(dashboard)/layout/DashboardContent';

type Props = PropsWithChildren;

/** Componente wrapper para o conteúdo de uma tela de workspace. */
function WorkspaceContent({ children }: Props) {
  return (
    <DashboardContent>
      <main className="flex flex-1 flex-col space-y-4">{children}</main>
    </DashboardContent>
  );
}

export default WorkspaceContent;
