import { SVGAttributes } from 'react';
import { BiCopy } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de cópia para indicar a ação de copiar. */
function CopyIcon(props: Props) {
  return <BiCopy {...props} />;
}

export default CopyIcon;
