import SpinnerIcon from '@/components/icons/common/SpinnerIcon';

function WorkspaceContentLoadingMore() {
  return (
    <div className="h-10">
      <SpinnerIcon className="mx-auto mt-4 h-5 w-5 text-indigo-400" />
    </div>
  );
}

export default WorkspaceContentLoadingMore;
