import { cn } from '@/utils/html';

import Button, { ButtonProps } from './Button';

type Props = ButtonProps;

function IconButton({ className, children, ...rest }: Props) {
  return (
    <Button className={cn('px-2', className)} {...rest}>
      {children}
    </Button>
  );
}

export default IconButton;
