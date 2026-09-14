import type { TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';

type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  help?: string;
  error?: string;
  rows?: number;
};

export const TextAreaField = ({
  label,
  required,
  optional,
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
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        rows={rows}
        className={clsx(fieldBaseClass, fieldColorClass(error), 'resize-y')}
        {...textareaProps}
      />
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};