import type { InputHTMLAttributes, ReactNode, CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface SearchOption<T = unknown> {
  id: string | number;
  label: string;
  data: T;
  disabled?: boolean;
}

export type SearchSelectProps<T = unknown> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'defaultValue' | 'onSelect' | 'className'
> & {
  label?: string;
  required?: boolean;
  optional?: boolean;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
  options: SearchOption<T>[];
  value?: string | number | null;
  onSelect: (option: SearchOption<T> | null) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  onSearchChange?: (search: string) => void;
  renderOption?: (option: SearchOption<T>, isSelected: boolean) => ReactNode;
};

export interface SearchSelectInputProps {
  id: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  error?: string;
  required?: boolean;
  isOpen: boolean;
  isLoading: boolean;
  leftIcon?: LucideIcon;
  setReference: (node: HTMLInputElement | null) => void;
  getReferenceProps: (props?: Record<string, unknown>) => Record<string, unknown>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
}

export interface SearchSelectDropdownProps {
  isOpen: boolean;
  isLoading: boolean;
  options: SearchOption<unknown>[];
  value: SearchOption<unknown>['id'] | null | undefined;
  loadingMessage: string;
  emptyMessage: string;
  floatingStyles: CSSProperties;
  getFloatingProps: () => Record<string, unknown>;
  setFloating: (node: HTMLDivElement | null) => void;
  getItemProps: (opts: { index: number; disabled?: boolean }) => React.HTMLProps<HTMLElement> | undefined;
  handleSelectOption: (option: SearchOption<unknown>) => void;
  renderOption?: (option: SearchOption<unknown>, isSelected: boolean) => ReactNode;
}

export type UseSearchSelectProps<T> = Pick<
  SearchSelectProps<T>,
  'options' | 'value' | 'onSelect' | 'onSearchChange' | 'disabled'
>;
