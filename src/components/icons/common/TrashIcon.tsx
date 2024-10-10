import { SVGAttributes } from 'react';
import { BiTrash } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de lixeira. */
function TrashIcon(props: Props) {
  return <BiTrash {...props} />;
}

export default TrashIcon;
