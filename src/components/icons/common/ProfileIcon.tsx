import { SVGAttributes } from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function ProfileIcon(props: Props) {
  return <BiSolidUserCircle {...props} />;
}

export default ProfileIcon;
