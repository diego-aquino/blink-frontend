import SpinnerIcon from '@/components/icons/common/SpinnerIcon';

/** Componente para indicar que uma p´gina está carregando. */
function PageLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SpinnerIcon className="h-7 w-7 text-indigo-400" />
    </div>
  );
}

export default PageLoading;
