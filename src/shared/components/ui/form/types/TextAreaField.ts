import type { TextareaHTMLAttributes } from 'react';

export type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  help?: string;
  error?: string;
  rows?: number;
};
