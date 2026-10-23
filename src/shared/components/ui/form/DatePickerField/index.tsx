import { clsx } from 'clsx';

import FieldLabel from '../FieldLabel';
import FieldHelp from '../FieldHelp';
import useDatePicker from './useDatePicker';
import type { DatePickerFieldProps } from '../types/DatePickerField';
import { DAYS } from './constants';
import Button from '../../button';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import DatePickerInput from './DatePickerInput';

const DatePickerField = ({
  label,
  required,
  optional,
  badge,
  leftIcon: LeftIcon,
  help,
  error,
  id,
  value,
  onChange,
  disabled = false,
  mode = 'single',
  minDate,
  maxDate,
  className,
  dateFormat = 'DD/MM/YYYY',
  ...props
}: DatePickerFieldProps) => {
  const {
    placeholderText,
    dropdownRef,
    inputRef,
    state,
    actions,
    displayValue,
    calendarDays,
  } = useDatePicker({
    value,
    onChange,
    mode,
    minDate,
    maxDate,
    dateFormat,
  });

  return (
    <div className={clsx('w-full', className)}>
      <FieldLabel
        label={label || ''}
        required={required}
        optional={optional}
        badge={badge}
        htmlFor={id}
      />

      <DatePickerInput
        id={id}
        displayValue={displayValue}
        placeholderText={placeholderText}
        disabled={disabled}
        required={required}
        error={error}
        leftIcon={LeftIcon}
        state={state}
        actions={actions}
        inputRef={inputRef as React.RefObject<HTMLDivElement>}
        {...props}
      />

      {state.isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className="fixed z-50 mt-1 w-70 origin-top-left bg-bg-surface-elevated border border-border-default shadow-sm rounded-xl p-3"
          role="dialog"
          aria-label="Seleccionar fecha"
        >
          {/* Header de navegación */}
          <CalendarHeader state={state} actions={actions} />

          {/* Días de la semana */}
          <div className="grid grid-cols-7 text-center mb-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="font-medium text-body-lg text-text-secondary"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Cuadrícula de fechas */}
          <CalendarGrid
            calendarDays={calendarDays}
            mode={mode}
            state={state}
            actions={actions}
          />

          {/* Footer */}
          <div className="flex items-center justify-center pt-3 mt-3 border-t border-border-default">
            <Button
              variant="outline"
              color="info"
              size="md"
              type="button"
              onClick={actions.jumpToToday}
              className="w-auto"
            >
              Today
            </Button>
          </div>
        </div>
      )}
      <FieldHelp
        help={help}
        error={error}
        id={id ? `${id}-message` : undefined}
      />
    </div>
  );
};

export default DatePickerField;
