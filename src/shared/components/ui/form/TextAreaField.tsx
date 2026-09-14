import type { TextareaHTMLAttributes } from 'react';
import { FieldLabel, fieldBaseClass } from './FieldLabel';

type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  rows?: number;
};

export const TextAreaField = ({
  label,
  required,
  optional,
  rows = 4,
  id,
  ...textareaProps
}: TextAreaFieldProps) => (
  <div>
    <FieldLabel label={label} required={required} optional={optional} htmlFor={id} />
    <textarea
      id={id}
      rows={rows}
      className={`${fieldBaseClass} resize-y`}
      {...textareaProps}
    />
  </div>
);