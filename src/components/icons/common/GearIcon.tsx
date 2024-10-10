import { SVGAttributes } from 'react';
import { BiCog } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de engrenagem para indicar configurações. */
function GearIcon(props: Props) {
  return <BiCog {...props} />;
}

export default GearIcon;
