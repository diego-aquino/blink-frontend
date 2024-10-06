import { ComponentProps } from 'react';

import SpinnerIcon from '@/components/icons/common/SpinnerIcon';
import { cn } from '@/utils/html';

interface Props extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

function Button({ variant = 'primary', loading = false, disabled = false, className = '', children, ...rest }: Props) {
  return (
    <button
      type="button"
      className={cn(
        'relative flex items-center justify-center rounded-lg py-1.5 text-center font-medium outline-none transition-all',
        !/\bpx-[^ ]+/.test(className) && 'px-4',

        variant === 'primary' &&
          cn('bg-indigo-500 text-white', !(loading || disabled) && 'hover:bg-indigo-600 active:bg-indigo-700'),
        variant === 'secondary' &&
          cn('bg-slate-100 text-slate-800', !(loading || disabled) && 'hover:bg-slate-200 active:bg-slate-300'),
        variant === 'danger' &&
          cn('bg-red-500 text-white', !(loading || disabled) && 'hover:bg-red-600 active:bg-red-700'),

        loading && 'cursor-progress bg-opacity-85 text-opacity-40',
        !(loading || disabled) && 'focus:ring-2 focus:ring-indigo-200',

        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <div className="space-x-2">{children}</div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SpinnerIcon className="h-5 w-5 text-white" />
        </div>
      )}
    </button>
  );
}

export default Button;
export type { Props as ButtonProps };
