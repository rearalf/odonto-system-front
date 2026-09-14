import { useRef } from 'react';
import { Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { DateFieldProps } from './DateField.types';

const DateField = ({
  label,
  required,
  optional,
  badge,
  leftIcon: Icon,
  help,
  error,
  id,
  value,
  onChange,
  ...inputProps
}: DateFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = id ? `${id}-message` : undefined;

  const openPicker = () => {
    const input = inputRef.current;
    if (input?.showPicker) {
      try {
        input.showPicker();
      } catch {
        input.focus();
      }
    } else {
      input?.focus();
    }
  };

  return (
    <div>
      <FieldLabel
        label={label}
        required={required}
        optional={optional}
        badge={badge}
        htmlFor={id}
      />
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
          />
        )}
        <input
          ref={inputRef}
          id={id}
          type="date"
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            Icon && 'pl-11',
            'pr-12 [&::-webkit-calendar-picker-indicator]:opacity-0',
          )}
          {...inputProps}
        />
        <button
          type="button"
          aria-label="Abrir calendario"
          onClick={openPicker}
          className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-text-subtle transition hover:text-primary"
        >
          <Calendar aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default DateField;