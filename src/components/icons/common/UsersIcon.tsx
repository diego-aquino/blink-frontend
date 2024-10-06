import { SVGAttributes } from 'react';
import { BiSolidUserAccount } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function UsersIcon(props: Props) {
  return <BiSolidUserAccount {...props} />;
}

export default UsersIcon;
