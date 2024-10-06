import { SVGAttributes } from 'react';
import { BiCog } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function GearIcon(props: Props) {
  return <BiCog {...props} />;
}

export default GearIcon;
