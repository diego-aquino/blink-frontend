import { SVGAttributes } from 'react';
import { BiTimeFive } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function ClockIcon(props: Props) {
  return <BiTimeFive {...props} />;
}

export default ClockIcon;
