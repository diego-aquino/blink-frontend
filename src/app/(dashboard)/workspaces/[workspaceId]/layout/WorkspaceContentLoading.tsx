import SpinnerIcon from '@/components/icons/common/SpinnerIcon';

function WorkspaceContentLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SpinnerIcon className="h-7 w-7 text-indigo-400" />
    </div>
  );
}

export default WorkspaceContentLoading;
