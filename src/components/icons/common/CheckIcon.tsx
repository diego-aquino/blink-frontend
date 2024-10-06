import { SVGAttributes } from 'react';
import { BiCheck } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function CheckIcon(props: Props) {
  return <BiCheck {...props} />;
}

export default CheckIcon;
