import { SVGAttributes } from 'react';
import { BiLink } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de link. */
function LinkIcon(props: Props) {
  return <BiLink {...props} />;
}

export default LinkIcon;
