import { SVGAttributes } from 'react';
import { BiCalendarAlt } from 'react-icons/bi';

type Props = SVGAttributes<SVGSVGElement>;

function CalendarIcon(props: Props) {
  return <BiCalendarAlt {...props} />;
}

export default CalendarIcon;
