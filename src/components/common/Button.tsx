import { ComponentProps } from 'react';

import SpinnerIcon from '@/icons/common/SpinnerIcon';
import { cn } from '@/utils/html';

interface Props extends ComponentProps<'button'> {
  loading?: boolean;
}

function Button({ loading = false, disabled = false, className, children, ...rest }: Props) {
  return (
    <button
      type="button"
      className={cn(
        'relative rounded bg-indigo-400 px-2 py-1.5 text-center font-medium text-white outline-none transition-all',
        loading && 'cursor-progress bg-opacity-85 text-opacity-40',
        !(loading || disabled) && 'hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-200',
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {children}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SpinnerIcon className="h-5 w-5 text-white" />
        </div>
      )}
    </button>
  );
}

export default Button;
