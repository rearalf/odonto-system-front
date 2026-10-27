import { clsx } from 'clsx';
import { X, Calendar } from 'lucide-react';

import { fieldColorClass } from '../fieldColors';
import { fieldBaseClass } from '../FieldLabel';
import type { DatePickerInputProps } from '../types/DatePickerField';

const DatePickerInput = ({
  id,
  displayValue,
  placeholderText,
  disabled = false,
  required,
  error,
  leftIcon: LeftIcon,
  state,
  actions,
  inputRef,
  ...props
}: DatePickerInputProps) => {
  return (
    <div className="relative">
      <div className="relative" ref={inputRef}>
        {LeftIcon && (
          <LeftIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
          />
        )}
        <input
          id={id}
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholderText}
          onClick={() => !disabled && actions.setIsOpen(true)}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={id ? `${id}-message` : undefined}
          aria-haspopup="dialog"
          aria-expanded={state.isOpen}
          disabled={disabled}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            LeftIcon && 'pl-11',
            'pr-10 cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          {...props}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() => !disabled && actions.setIsOpen(!state.isOpen)}
          disabled={disabled}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-text-subtle hover:text-text-primary transition-colors"
        >
          <Calendar className="h-4 w-4" />
        </button>

        {displayValue && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            onClick={actions.clearDate}
            className="absolute inset-y-0 right-10 flex items-center px-2 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DatePickerInput;
