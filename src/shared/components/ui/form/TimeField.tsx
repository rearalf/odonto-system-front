import { clsx } from 'clsx';
import { IMaskInput, type IMaskInputProps } from 'react-imask';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { TimeFieldProps } from './types/TimeField';

const TimeField = ({
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
  disabled = false,
  showSeconds = true,
  ...inputProps
}: TimeFieldProps) => {
  const messageId = id ? `${id}-message` : undefined;

  const mask = showSeconds
    ? [
        { mask: /[0-2]/ },
        { mask: /[0-9]/ },
        ':',
        { mask: /[0-5]/ },
        { mask: /[0-9]/ },
        ':',
        { mask: /[0-5]/ },
        { mask: /[0-9]/ },
      ]
    : [
        { mask: /[0-2]/ },
        { mask: /[0-9]/ },
        ':',
        { mask: /[0-5]/ },
        { mask: /[0-9]/ },
      ];

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
        <IMaskInput
          id={id}
          mask={mask}
          placeholder={showSeconds ? 'HH:mm:ss' : 'HH:mm'}
          lazy={false}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          disabled={disabled}
          value={value}
          onAccept={(val: string) => onChange?.(val)}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            Icon && 'pl-11',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          {...(inputProps as Omit<IMaskInputProps<HTMLInputElement>, 'mask' | 'placeholder' | 'onAccept' | 'value' | 'onChange' | 'lazy'>)}
        />
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default TimeField;