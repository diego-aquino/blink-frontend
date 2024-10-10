import { SVGAttributes } from 'react';
import { BiTimeFive } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de relógio. */
function ClockIcon(props: Props) {
  return <BiTimeFive {...props} />;
}

export default ClockIcon;
