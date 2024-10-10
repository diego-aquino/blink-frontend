import { cn } from '@/utils/html';

import Button, { ButtonProps } from './Button';

type Props = ButtonProps;

/** Alternativa ao componente `Button` com padding horizontal reduzido para quando o botão contém apenas um ícone. */
function IconButton({ className, children, ...rest }: Props) {
  return (
    <Button className={cn('px-2', className)} {...rest}>
      {children}
    </Button>
  );
}

export default IconButton;
