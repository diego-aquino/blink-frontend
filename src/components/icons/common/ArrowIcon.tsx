import { SVGAttributes } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

import { cn } from '@/utils/html';

interface Props extends SVGAttributes<SVGSVGElement> {
  direction?: 'left' | 'right' | 'up' | 'down';
}

/** Ícone de seta com suporte a direção. */
function ArrowIcon({ direction = 'right', className, ...rest }: Props) {
  return (
    <BiRightArrowAlt
      className={cn(
        direction === 'left' && 'rotate-180',
        direction === 'right' && 'rotate-0',
        direction === 'up' && 'rotate-270',
        direction === 'down' && 'rotate-90',
        className,
      )}
      {...rest}
    />
  );
}

export default ArrowIcon;
