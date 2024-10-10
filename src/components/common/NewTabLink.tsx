import { ComponentProps } from 'react';

interface Props extends ComponentProps<'a'> {
  href: string;
}

/** Componente de link que abre em uma nova aba. */
function NewTabLink({ href, children, ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export default NewTabLink;
