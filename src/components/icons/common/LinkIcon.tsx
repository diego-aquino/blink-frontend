import { SVGAttributes } from 'react';
import { BiLink } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function LinkIcon(props: Props) {
  return <BiLink {...props} />;
}

export default LinkIcon;
