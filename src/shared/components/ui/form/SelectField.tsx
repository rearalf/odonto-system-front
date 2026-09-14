import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';

type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'className'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
  children: ReactNode;
};

export const SelectField = ({
  label,
  required,
  optional,
  leftIcon: Icon,
  help,
  error,
  id,
  children,
  ...selectProps
}: SelectFieldProps) => {
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
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
          />
        )}
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            Icon && 'pl-11',
            'cursor-pointer appearance-none pr-10',
          )}
          {...selectProps}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={16}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-subtle"
        />
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};