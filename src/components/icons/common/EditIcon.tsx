import { SVGAttributes } from 'react';
import { BiPencil } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

/** Ícone de lápis para indicar edição. */
function EditIcon(props: Props) {
  return <BiPencil {...props} />;
}

export default EditIcon;
