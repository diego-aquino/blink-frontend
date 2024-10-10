import { SVGAttributes } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { cn } from '@/utils/html';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de spinner animado indicando carregamento. */
function SpinnerIcon({ className, ...rest }: Props) {
  return <BiLoaderAlt className={cn('animate-spin', className)} {...rest} />;
}

export default SpinnerIcon;
