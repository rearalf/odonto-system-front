import type { LucideIcon } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

export type InputFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: string;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
};
