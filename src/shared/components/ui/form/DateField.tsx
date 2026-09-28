import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { DateFieldProps } from './types/DateField';

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
  const messageId = id ? `${id}-message` : undefined;

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
          )}
          {...inputProps}
        />
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default DateField;
