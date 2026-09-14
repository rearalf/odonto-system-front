import type { LucideIcon } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';
import { FieldLabel, fieldBaseClass } from './FieldLabel';

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: string;
  leftIcon?: LucideIcon;
};

export const InputField = ({
  label,
  required,
  optional,
  badge,
  leftIcon: Icon,
  id,
  ...inputProps
}: InputFieldProps) => (
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
        className={`${fieldBaseClass} ${Icon ? 'pl-11' : ''}`}
        {...inputProps}
      />
    </div>
  </div>
);