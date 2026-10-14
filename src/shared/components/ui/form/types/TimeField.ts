import type { IMaskInputProps } from 'react-imask';

export type TimeFieldProps = Omit<
  IMaskInputProps<HTMLInputElement>,
  'mask' | 'placeholder' | 'onAccept' | 'value' | 'onChange'
> & {
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: React.ReactNode;
  leftIcon?: React.ElementType;
  help?: string;
  error?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  showSeconds?: boolean;
};