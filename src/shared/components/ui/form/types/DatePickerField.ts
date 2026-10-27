import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import type { LucideIcon } from 'lucide-react';

export type DateFormat =
  | 'YYYY-MM-DD'
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY';

export interface DatePickerFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  badge?: ReactNode;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  mode?: 'single' | 'range';
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  dateFormat?: DateFormat;
}

export interface UseDatePickerOptions {
  value?: string;
  onChange?: (val: string) => void;
  mode?: 'single' | 'range';
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: DateFormat;
}

export interface State {
  selectedDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  isOpen: boolean;
  viewDate: Date;
  mode: 'single' | 'range';
}

export interface CalendarGridProps {
  calendarDays: { date: Date; isCurrentMonth: boolean }[];
  mode: 'single' | 'range';
  state: State;
  actions: {
    isDateDisabled: (date: Date) => boolean;
    selectDate: (date: Date) => void;
  };
}

export interface CalendarHeaderProps {
  state: State;
  actions: {
    setViewDate: (value: React.SetStateAction<Date>) => void;
    prevMonth: () => void;
    nextMonth: () => void;
  };
}

export interface DatePickerInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  id?: string;
  displayValue: string;
  placeholderText: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  leftIcon?: LucideIcon;
  inputRef?: Ref<HTMLDivElement>;
  state: {
    isOpen: boolean;
  };
  actions: {
    setIsOpen: (open: boolean) => void;
    clearDate: () => void;
  };
}
