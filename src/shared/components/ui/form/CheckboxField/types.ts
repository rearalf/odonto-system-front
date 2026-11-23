import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'card';

export type CheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'type' | 'size'
> & {
  label: string;
  description?: string;
  required?: boolean;
  optional?: boolean;
  badge?: ReactNode;
  help?: string;
  error?: string;
  indeterminate?: boolean;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  className?: string;
  inputClassName?: string;
  ref?: Ref<HTMLInputElement>;
};
