import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type {
  TimePickerFieldProps,
  UseTimePickerReturn,
  TimePickerState,
} from '../types/TimePickerField';
import {
  HOURS_12_LIST,
  HOURS_24_LIST,
  MINUTES_LIST,
  PERIODS_LIST,
} from './constants';
import { getInitialState, getParsedState } from './functions';

function useTimePicker(props: TimePickerFieldProps): UseTimePickerReturn {
  const {
    value,
    onChange,
    disabled = false,
    showSeconds = true,
    stepSeconds = 30,
    min,
    max,
    use12Hour = true,
    accept12HourInput = true,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef<string | undefined>(value);

  const [state, setState] = useState<TimePickerState>(() =>
    getParsedState(value, use12Hour, accept12HourInput),
  );

  const hoursList = use12Hour ? HOURS_12_LIST : HOURS_24_LIST;

  const secondsList = useMemo(() => {
    if (!showSeconds) return [];
    if (stepSeconds && stepSeconds > 0) {
      return Array.from(
        { length: Math.floor(60 / stepSeconds) },
        (_, i) => i * stepSeconds,
      );
    }
    return MINUTES_LIST;
  }, [showSeconds, stepSeconds]);

  const to24Hour = useCallback(
    (h12: number, pm: boolean) => {
      if (!use12Hour) return h12;
      if (h12 === 12) return pm ? 12 : 0;
      return pm ? h12 + 12 : h12;
    },
    [use12Hour],
  );

  const to12Hour = useCallback(
    (h24: number) => {
      if (!use12Hour) return h24;
      if (h24 === 0) return 12;
      if (h24 > 12) return h24 - 12;
      return h24;
    },
    [use12Hour],
  );

  const formatStorage = useCallback((h: number, m: number, s: number) => {
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }, []);

  const formatDisplay = useCallback(
    (h: number, m: number, s: number, pm: boolean) => {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const ss = showSeconds ? `:${String(s).padStart(2, '0')}` : '';
      if (!use12Hour) return `${hh}:${mm}${ss}`;

      const h12 = to12Hour(h);
      const hh12 = String(h12).padStart(2, '0');
      return `${hh12}:${mm}${ss} ${pm ? 'PM' : 'AM'}`;
    },
    [use12Hour, showSeconds, to12Hour],
  );

  const parseValue = useCallback((): TimePickerState => {
    return getParsedState(value, use12Hour, accept12HourInput);
  }, [value, use12Hour, accept12HourInput]);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      setState(parseValue());
    }
  }, [value, parseValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setState((prev) => ({ ...prev, isOpen: false }));
      }
    };
    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isOpen]);

  const isDisabled = useCallback(
    (h: number, m: number, s: number, pm: boolean) => {
      const h24 = to24Hour(h, pm);
      const timeStr = formatStorage(h24, m, s);
      if (min && timeStr < min) return true;
      if (max && timeStr > max) return true;
      return false;
    },
    [min, max, to24Hour, formatStorage],
  );

  const actions = {
    setHours: (h: number) => setState((prev) => ({ ...prev, hours: h })),
    setMinutes: (m: number) => setState((prev) => ({ ...prev, minutes: m })),
    setSeconds: (s: number) => setState((prev) => ({ ...prev, seconds: s })),
    setPeriod: (p: 'AM' | 'PM') => setState((prev) => ({ ...prev, period: p })),
    setIsOpen: (open: boolean) =>
      setState((prev) => ({ ...prev, isOpen: open })),
    handleSelect: () => {
      const h24 = to24Hour(state.hours, state.period === 'PM');
      const formatted = formatStorage(h24, state.minutes, state.seconds);
      onChange?.(formatted);
      setState((prev) => ({ ...prev, isOpen: false }));
      inputRef.current?.focus();
    },
    handleClear: () => {
      onChange?.('');
      setState(getInitialState(use12Hour));
    },
    handleNow: () => {
      const now = new Date();
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      let pm = h >= 12;

      if (use12Hour) {
        if (h === 0) h = 12;
        else if (h > 12) h -= 12;
      }

      // Round seconds to nearest step if stepSeconds is set
      if (stepSeconds && stepSeconds > 0) {
        s = Math.round(s / stepSeconds) * stepSeconds;
        if (s === 60) {
          s = 0;
          m += 1;
          if (m === 60) {
            m = 0;
            h = (h + 1) % 24;
            if (use12Hour && h === 13) h = 1;
            else if (!use12Hour && h === 24) h = 0;
            pm = h >= 12 && !use12Hour;
            if (use12Hour) pm = h >= 12 && h !== 12;
          }
        }
      }

      setState({
        hours: h,
        minutes: m,
        seconds: s,
        period: pm ? 'PM' : 'AM',
        isOpen: false,
      });
      const h24 = to24Hour(h, pm);
      onChange?.(formatStorage(h24, m, s));
      inputRef.current?.focus();
    },
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!disabled) {
          setState((prev) => ({ ...prev, isOpen: true }));
        }
      }
      if (e.key === 'Escape') setState((prev) => ({ ...prev, isOpen: false }));
    },
  };

  const displayValue = value
    ? formatDisplay(
        use12Hour ? to24Hour(state.hours, state.period === 'PM') : state.hours,
        state.minutes,
        state.seconds,
        state.period === 'PM',
      )
    : '';

  const isHourDisabled = useCallback(
    (h: number) =>
      MINUTES_LIST.every((m) =>
        showSeconds
          ? secondsList.every((s) => isDisabled(h, m, s, state.period === 'PM'))
          : isDisabled(h, m, 0, state.period === 'PM'),
      ),
    [showSeconds, secondsList, isDisabled, state.period],
  );

  const isMinuteDisabled = useCallback(
    (m: number) =>
      showSeconds
        ? secondsList.every((s) =>
            isDisabled(state.hours, m, s, state.period === 'PM'),
          )
        : isDisabled(state.hours, m, 0, state.period === 'PM'),
    [showSeconds, secondsList, isDisabled, state.hours, state.period],
  );

  const isSecondDisabled = useCallback(
    (s: number) =>
      isDisabled(state.hours, state.minutes, s, state.period === 'PM'),
    [isDisabled, state.hours, state.minutes, state.period],
  );

  const isPeriodDisabled = useCallback(
    (p: 'AM' | 'PM') =>
      isDisabled(state.hours, state.minutes, state.seconds, p === 'PM'),
    [isDisabled, state.hours, state.minutes, state.seconds],
  );

  return {
    state,
    actions,
    displayValue,
    hoursList,
    minutesList: MINUTES_LIST,
    secondsList,
    periodsList: PERIODS_LIST,
    isHourDisabled,
    isMinuteDisabled,
    isSecondDisabled,
    isPeriodDisabled,
    inputRef,
    dropdownRef,
  };
}

export default useTimePicker;
