import type { LucideIcon } from 'lucide-react';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export type MultiSelectFieldProps = {
  label?: string;
  required?: boolean;
  optional?: boolean;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
  id?: string;
  options: MultiSelectOption[];
  placeholder?: string;
  maxTags?: number;
  className?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
};
