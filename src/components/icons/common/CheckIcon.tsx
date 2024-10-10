import { SVGAttributes } from 'react';
import { BiCheck } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de check. */
function CheckIcon(props: Props) {
  return <BiCheck {...props} />;
}

export default CheckIcon;
