'use client';

import useBlinkCreation from '@/hooks/workspaces/blinks/useBlinkCreation';

import useWorkspaceParams from '../../hooks/useWorkspaceParams';
import BlinkForm from '../BlinkForm';

/** Formulário de criação de um novo link. */
function CreateBlinkForm() {
  const { workspaceId } = useWorkspaceParams();

  const blinkCreation = useBlinkCreation(workspaceId);

  return <BlinkForm cancelHref={`/workspaces/${workspaceId}`} onSubmit={(values) => blinkCreation.run(values)} />;
}

export default CreateBlinkForm;
