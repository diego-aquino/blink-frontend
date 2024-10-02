import { SVGAttributes } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { cn } from '@/utils/html';

type Props = SVGAttributes<SVGSVGElement>;

function SpinnerIcon({ className }: Props) {
  return <BiLoaderAlt className={cn('animate-spin', className)} />;
}

export default SpinnerIcon;
