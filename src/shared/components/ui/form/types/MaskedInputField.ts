import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { IMaskInputProps } from 'react-imask';

export type MaskedInputFieldProps = Omit<
  IMaskInputProps<HTMLInputElement>,
  'className'
> & {
  mask: Exclude<IMaskInputProps<HTMLInputElement>['mask'], undefined>;
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: string;
  leftIcon?: LucideIcon;
  prefix?: ReactNode;
  help?: string;
  error?: string;
};