import { X, Loader2, CircleCheck } from 'lucide-react';
import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { InputFieldProps, ValidationState } from './types/InputField';

const validationIcons: Record<ValidationState, typeof CircleCheck> = {
  valid: CircleCheck,
  invalid: X,
  pending: Loader2,
};

const validationColors: Record<ValidationState, string> = {
  valid: 'text-green-500',
  invalid: 'text-red-500',
  pending: 'text-blue-500 animate-spin',
};

const InputField = ({
  label,
  required,
  optional,
  badge,
  leftIcon: LeftIcon,
  prefix,
  help,
  error,
  id,
  validationState,
  ...inputProps
}: InputFieldProps) => {
  const messageId = id ? `${id}-message` : undefined;
  const showValidationIcon = validationState !== undefined;
  const ValidationIcon = showValidationIcon
    ? validationIcons[validationState]
    : null;
  const validationColor = showValidationIcon
    ? validationColors[validationState]
    : '';

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
        {LeftIcon && (
          <LeftIcon
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
          aria-invalid={
            error ? true : validationState === 'invalid' ? true : undefined
          }
          aria-describedby={messageId}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            LeftIcon && 'pl-11',
            prefix && 'pl-16',
            showValidationIcon && 'pr-11',
          )}
          {...inputProps}
        />
        {showValidationIcon && ValidationIcon && (
          <ValidationIcon
            aria-hidden="true"
            className={clsx(
              'pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2',
              validationColor,
            )}
          />
        )}
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default InputField;
