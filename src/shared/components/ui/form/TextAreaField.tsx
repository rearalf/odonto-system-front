import { clsx } from 'clsx';
import { useState } from 'react';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { TextAreaFieldProps } from './types/TextAreaField';

const TextAreaField = ({
  label,
  required,
  optional,
  badge,
  leftIcon: Icon,
  labelEnd,
  help,
  error,
  rows = 4,
  maxLength,
  id,
  onChange,
  value,
  ...textareaProps
}: TextAreaFieldProps) => {
  const messageId = id ? `${id}-message` : undefined;

  const getValueLength = (input: TextAreaFieldProps['value']) => {
    if (typeof input === 'string') return input.length;
    if (typeof input === 'number') return String(input).length;
    if (Array.isArray(input)) return input.join('').length;
    return 0;
  };

  const [length, setLength] = useState(() => getValueLength(value));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLength(getValueLength(newValue));
    onChange?.(e);
  };

  const isOverLimit = maxLength && length > maxLength;
  const errorMessage = isOverLimit ? `Máximo ${maxLength} caracteres` : error;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <FieldLabel
          label={label}
          required={required}
          optional={optional}
          badge={badge}
          htmlFor={id}
        />
        {labelEnd}
      </div>
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-4 h-4 w-4 text-text-subtle"
          />
        )}
        <textarea
          id={id}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={messageId}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(errorMessage),
            Icon && 'pl-11',
            'resize-y',
          )}
          {...textareaProps}
        />
      </div>
      {maxLength && (
        <div
          className={clsx(
            'text-right text-sm mt-1',
            isOverLimit ? 'text-error' : 'text-text-subtle',
          )}
        >
          {length} / {maxLength}
        </div>
      )}
      <FieldHelp help={help} error={errorMessage} id={messageId} />
    </div>
  );
};

export default TextAreaField;
