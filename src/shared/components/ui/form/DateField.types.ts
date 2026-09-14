import type { LucideIcon } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

export type DateFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'type' | 'value' | 'onChange'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: string;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
  min?: string;
  max?: string;
  value: string;
  onChange: (value: string) => void;
};