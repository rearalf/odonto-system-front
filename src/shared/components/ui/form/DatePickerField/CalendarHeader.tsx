import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import Button from '../../button';
import { MONTHS } from './constants';
import { addMonths } from './functions';
import type { CalendarHeaderProps } from '../types/DatePickerField';

const CalendarHeader = (props: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-default">
      <div className="flex gap-1">
        <Button
          variant="ghost"
          color="primary"
          size="sm"
          onClick={() =>
            props.actions.setViewDate(addMonths(props.state.viewDate, -12))
          }
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="sm"
          onClick={props.actions.prevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <span className="font-bold text-headline-sm text-text-primary">
        {MONTHS[props.state.viewDate.getMonth()]}{' '}
        {props.state.viewDate.getFullYear()}
      </span>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          color="primary"
          size="sm"
          onClick={props.actions.nextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="sm"
          onClick={() =>
            props.actions.setViewDate(addMonths(props.state.viewDate, 12))
          }
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
