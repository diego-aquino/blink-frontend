import { ComponentProps, ForwardedRef, forwardRef } from 'react';

import { cn } from '@/utils/html';

interface Props extends ComponentProps<'input'> {
  label: string;
  hideLabel?: boolean;
  errorMessage?: string;
  labelClassName?: string;
}

function Input(
  {
    label,
    type = 'text',
    hideLabel = false,
    errorMessage,
    className = '',
    labelClassName,
    required = true,
    disabled = false,
    readOnly = false,
    ...rest
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const input = (
    <input
      ref={ref}
      type={type}
      className={cn(
        type !== 'checkbox' && 'rounded py-1 outline-none ring-2 ring-slate-300 transition-shadow',
        !/\bpx-[^ ]+/.test(className) && 'px-2',
        disabled || readOnly
          ? 'cursor-not-allowed bg-slate-50 opacity-80'
          : 'bg-white hover:ring-slate-400 focus:ring-slate-500',
        className,
      )}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      {...rest}
    />
  );

  return (
    <label className={cn('flex', type === 'checkbox' ? 'flex-row space-x-2' : 'flex-col space-y-1', labelClassName)}>
      {type === 'checkbox' && input}

      <div className={cn('flex items-center', hideLabel ? 'justify-end' : 'justify-between')}>
        <div className={cn(hideLabel && 'sr-only')}>
          <span className="font-medium">{label}</span>
          {!required && <span className="text-slate-500"> (opcional)</span>}
        </div>

        {errorMessage && <span className="block text-xs text-red-500">{errorMessage}</span>}
      </div>

      {type !== 'checkbox' && input}
    </label>
  );
}

export default forwardRef(Input);
