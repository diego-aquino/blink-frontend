import SpinnerIcon from '@/components/icons/common/SpinnerIcon';

/** Componente de loading para o conteúdo de um workspace. */
function WorkspaceContentLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SpinnerIcon className="h-7 w-7 text-indigo-400" />
    </div>
  );
}

export default WorkspaceContentLoading;
