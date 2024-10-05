import { SVGAttributes } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { cn } from '@/utils/html';

type Props = SVGAttributes<SVGSVGElement>;

function SpinnerIcon({ className, ...rest }: Props) {
  return <BiLoaderAlt className={cn('animate-spin', className)} {...rest} />;
}

export default SpinnerIcon;
