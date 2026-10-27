import { clsx } from 'clsx';
import { Clock, X } from 'lucide-react';
import { fieldColorClass } from '../fieldColors';
import { fieldBaseClass } from '../FieldLabel';
import type { TimePickerInputProps } from '../types/TimePickerField';

const TimePickerInput = ({
  id,
  error,
  isOpen,
  actions,
  required,
  messageId,
  displayValue,
  leftIcon: Icon,
  placeholderText,
  disabled = false,
  setReference,
}: TimePickerInputProps) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
        />
      )}

      <input
        ref={setReference}
        id={id}
        type="text"
        readOnly
        value={displayValue}
        placeholder={placeholderText}
        onClick={() => !disabled && actions.setIsOpen(true)}
        onKeyDown={actions.handleKeyDown}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        disabled={disabled}
        className={clsx(
          fieldBaseClass,
          fieldColorClass(error),
          Icon && 'pl-11',
          'pr-10 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      />

      <button
        type="button"
        tabIndex={-1}
        onClick={() => !disabled && actions.setIsOpen(!isOpen)}
        disabled={disabled}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-text-subtle hover:text-text-primary transition-colors"
        aria-label="Abrir selector de hora"
      >
        <Clock className="h-4 w-4" />
      </button>

      {displayValue && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          onClick={actions.handleClear}
          className="absolute inset-y-0 right-10 flex items-center px-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Limpiar hora"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default TimePickerInput;
