import { ComponentProps } from 'react';

interface Props extends ComponentProps<'a'> {
  href: string;
}

function NewTabLink({ href, children, ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export default NewTabLink;
