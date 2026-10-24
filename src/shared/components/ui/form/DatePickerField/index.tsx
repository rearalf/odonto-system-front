import { FloatingPortal } from '@floating-ui/react';
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
    setReference,
    setCalendar,
    floatingStyles,
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
        inputRef={setReference}
        {...props}
      />

      {state.isOpen && !disabled && (
        <FloatingPortal>
          <div
            ref={setCalendar}
            style={floatingStyles}
            className="z-[60] w-70 origin-top-left rounded-xl border border-border-default bg-bg-surface-elevated p-3 shadow-sm"
            role="dialog"
            aria-label="Seleccionar fecha"
          >
            <CalendarHeader state={state} actions={actions} />

            <div className="mb-2 grid grid-cols-7 text-center">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="font-medium text-body-lg text-text-secondary"
                >
                  {day}
                </div>
              ))}
            </div>

            <CalendarGrid
              calendarDays={calendarDays}
              mode={mode}
              state={state}
              actions={actions}
            />

            <div className="mt-3 flex items-center justify-center border-t border-border-default pt-3">
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
        </FloatingPortal>
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
