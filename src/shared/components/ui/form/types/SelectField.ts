import type { LucideIcon } from 'lucide-react';
import type { ReactNode, SelectHTMLAttributes } from 'react';

export type SelectFieldProps = Omit<
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
