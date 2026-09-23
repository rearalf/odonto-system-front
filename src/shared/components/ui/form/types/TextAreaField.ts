import type { TextareaHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

export type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
  rows?: number;
  maxLength?: number;
};
