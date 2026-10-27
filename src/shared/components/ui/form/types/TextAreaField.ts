import type { ReactNode, TextareaHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

export type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: string;
  leftIcon?: LucideIcon;
  labelEnd?: ReactNode;
  help?: string;
  error?: string;
  rows?: number;
  maxLength?: number;
};
