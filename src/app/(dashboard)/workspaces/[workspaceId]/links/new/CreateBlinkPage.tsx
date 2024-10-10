import { WorkspaceParams } from '../../hooks/useWorkspaceParams';
import WorkspaceContentHeader from '../../layout/WorkspaceContentHeader';
import CreateBlinkForm from './CreateBlinkForm';

interface PageParams {
  params: WorkspaceParams;
}

/** Página de criação de um novo link. */
function CreateBlinkPage({ params }: PageParams) {
  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <WorkspaceContentHeader title="Criar Link" returnHref={`/workspaces/${params.workspaceId}`} />
      <CreateBlinkForm />
    </div>
  );
}

export default CreateBlinkPage;
