import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { InputFieldProps } from './types/InputField';

const InputField = ({
  label,
  required,
  optional,
  badge,
  leftIcon: Icon,
  prefix,
  help,
  error,
  id,
  ...inputProps
}: InputFieldProps) => {
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
        {prefix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
          >
            <span className="rounded-lg bg-bg-surface-elevated px-2.5 py-1.5 text-label-lg font-medium text-text-secondary">
              {prefix}
            </span>
          </span>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            Icon && 'pl-11',
            prefix && 'pl-16',
          )}
          {...inputProps}
        />
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default InputField;