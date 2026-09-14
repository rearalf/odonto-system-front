import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { TextAreaFieldProps } from './types/TextAreaField';

const TextAreaField = ({
  label,
  required,
  optional,
  leftIcon: Icon,
  help,
  error,
  rows = 4,
  id,
  ...textareaProps
}: TextAreaFieldProps) => {
  const messageId = id ? `${id}-message` : undefined;

  return (
    <div>
      <FieldLabel
        label={label}
        required={required}
        optional={optional}
        htmlFor={id}
      />
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-4 h-4 w-4 text-text-subtle"
          />
        )}
        <textarea
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          rows={rows}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            Icon && 'pl-11',
            'resize-y',
          )}
          {...textareaProps}
        />
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default TextAreaField;
