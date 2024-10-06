import { SVGAttributes } from 'react';
import { BiCopy } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function CopyIcon(props: Props) {
  return <BiCopy {...props} />;
}

export default CopyIcon;
