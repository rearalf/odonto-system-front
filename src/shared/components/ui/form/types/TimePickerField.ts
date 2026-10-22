import type { LucideIcon } from 'lucide-react';

export interface TimePickerFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: React.ReactNode;
  leftIcon?: LucideIcon;
  help?: string;
  error?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  showSeconds?: boolean;
  stepSeconds?: number;
  min?: string;
  max?: string;
  use12Hour?: boolean;
  accept12HourInput?: boolean;
  className?: string;
}

export interface TimePickerState {
  hours: number;
  minutes: number;
  seconds: number;
  period: 'AM' | 'PM';
  isOpen: boolean;
}

export interface TimePickerActions {
  setHours: (h: number) => void;
  setMinutes: (m: number) => void;
  setSeconds: (s: number) => void;
  setPeriod: (p: 'AM' | 'PM') => void;
  setIsOpen: (open: boolean) => void;
  handleSelect: () => void;
  handleClear: () => void;
  handleNow: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface UseTimePickerReturn {
  state: TimePickerState;
  actions: TimePickerActions;
  displayValue: string;
  hoursList: number[];
  minutesList: number[];
  secondsList: number[];
  periodsList: ('AM' | 'PM')[];
  isHourDisabled: (h: number) => boolean;
  isMinuteDisabled: (m: number) => boolean;
  isSecondDisabled: (s: number) => boolean;
  isPeriodDisabled: (p: 'AM' | 'PM') => boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}
