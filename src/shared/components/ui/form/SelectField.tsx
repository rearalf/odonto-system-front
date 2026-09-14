import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import { FieldLabel, fieldBaseClass } from './FieldLabel';

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  leftIcon?: LucideIcon;
  children: ReactNode;
};

export const SelectField = ({
  label,
  required,
  optional,
  leftIcon: Icon,
  id,
  children,
  ...selectProps
}: SelectFieldProps) => (
  <div>
    <FieldLabel label={label} required={required} optional={optional} htmlFor={id} />
    <div className="relative">
      {Icon && (
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
        />
      )}
      <select
        id={id}
        className={`${fieldBaseClass} ${Icon ? 'pl-11' : ''} cursor-pointer appearance-none pr-10`}
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
  </div>
);