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
  leftIcon: Icon,
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
  const [length, setLength] = useState(value?.length ?? 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLength(newValue.length);
    onChange?.(e);
  };

  const isOverLimit = maxLength && length > maxLength;
  const errorMessage = isOverLimit ? `Máximo ${maxLength} caracteres` : error;

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
