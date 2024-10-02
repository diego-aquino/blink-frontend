import { ComponentProps, ForwardedRef, forwardRef } from 'react';

import { cn } from '@/utils/html';

interface Props extends ComponentProps<'input'> {
  label: string;
  errorMessage?: string;
}

function Input({ label, errorMessage, className, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <label className="block space-y-1">
      <div className="flex items-center justify-between">
        <span className="block font-medium">{label}</span>

        {errorMessage && <span className="block text-xs text-red-500">{errorMessage}</span>}
      </div>

      <input
        ref={ref}
        type="text"
        className={cn(
          'w-full rounded px-2 py-1 outline-none ring-2 ring-slate-300 transition-shadow hover:ring-slate-400 focus:ring-slate-500',
          className,
        )}
        {...rest}
      />
    </label>
  );
}

export default forwardRef(Input);
