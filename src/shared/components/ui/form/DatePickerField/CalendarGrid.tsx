import clsx from 'clsx';
import Button from '../../button';
import type { CalendarGridProps } from '../types/DatePickerField';
import { isSameDay, isWithinRange } from './functions';

const CalendarGrid = (props: CalendarGridProps) => {
  const today = new Date();

  return (
    <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
      {props.calendarDays.map((dayObj, i) => {
        const isDisabled = props.actions.isDateDisabled(dayObj.date);
        const isSelected =
          props.mode === 'single' &&
          isSameDay(dayObj.date, props.state.selectedDate);
        const isStart =
          props.mode === 'range' &&
          isSameDay(dayObj.date, props.state.startDate);
        const isEnd =
          props.mode === 'range' && isSameDay(dayObj.date, props.state.endDate);
        const inRange =
          props.mode === 'range' &&
          isWithinRange(
            dayObj.date,
            props.state.startDate,
            props.state.endDate,
          );
        const isToday = isSameDay(dayObj.date, today);

        return (
          <Button
            variant="ghost"
            color="primary"
            size="sm"
            key={i}
            type="button"
            disabled={isDisabled}
            onClick={() => props.actions.selectDate(dayObj.date)}
            className={clsx(
              'py-1.5 transition-colors relative w-full',
              // Color de texto básico según mes activo o inactivo
              dayObj.isCurrentMonth ? 'text-text-primary' : 'text-text-muted',
              // Estilos para resaltar hoy
              isToday &&
                !isSelected &&
                !isStart &&
                !isEnd &&
                'text-blue-500 font-bold bg-blue-500/10 hover:bg-blue-500/20',
              // Hover general
              !isDisabled &&
                !isSelected &&
                !isStart &&
                !isEnd &&
                !isToday &&
                'rounded-md',
              // Deshabilitado
              isDisabled && 'opacity-30 cursor-not-allowed',
              // Diseño Single (Borde azul)
              isSelected && 'border border-blue-500 rounded-md bg-primary/25',
              // Diseño Range (Fondos y bordes)
              inRange &&
                !isStart &&
                !isEnd &&
                'bg-blue-900/30 text-blue-100 rounded-none',
              isStart && 'bg-blue-600 text-white rounded-l-md',
              isEnd && 'bg-blue-600 text-white rounded-r-md',
              isStart && !props.state.endDate && 'rounded-md',
            )}
          >
            {dayObj.date.getDate()}
          </Button>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
