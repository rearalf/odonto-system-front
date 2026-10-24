import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  flip,
  shift,
  offset,
  autoUpdate,
  useFloating,
} from '@floating-ui/react';
import type { UseDatePickerOptions } from '../types/DatePickerField';
import {
  addMonths,
  formatByOrder,
  formatDate,
  getCalendarDays,
  isAfterOrEqual,
  isBeforeOrEqual,
  isSameDay,
  parseDateString,
} from './functions';

function useDatePicker({
  value,
  onChange,
  mode = 'single',
  minDate,
  maxDate,
  dateFormat = 'DD/MM/YYYY',
}: UseDatePickerOptions) {
  const [dropdownElement, setDropdownElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [inputElement, setInputElement] = useState<HTMLDivElement | null>(null);
  const {
    refs: { setReference: setFloatingReference, setFloating },
    floatingStyles,
  } = useFloating({
    placement: 'bottom-start',
    strategy: 'fixed',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const setReference = useCallback(
    (node: HTMLDivElement | null) => {
      setInputElement(node);
      setFloatingReference(node);
    },
    [setFloatingReference],
  );
  const setCalendar = useCallback(
    (node: HTMLDivElement | null) => {
      setDropdownElement(node);
      setFloating(node);
    },
    [setFloating],
  );

  // Parseo inicial (solo en mount)
  const [initialParsed] = useState(() => {
    if (!value) return { single: null, start: null, end: null };
    if (mode === 'single')
      return { single: parseDateString(value), start: null, end: null };
    const [startStr, endStr] = value.split(' - ');
    return {
      single: null,
      start: parseDateString(startStr?.trim()),
      end: parseDateString(endStr?.trim()),
    };
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialParsed.single,
  );
  const [startDate, setStartDate] = useState<Date | null>(initialParsed.start);
  const [endDate, setEndDate] = useState<Date | null>(initialParsed.end);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(
    initialParsed.single ?? initialParsed.start ?? new Date(),
  );

  // Refs para leer estado actual en callbacks sin staleness
  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);
  const isUserChangeRef = useRef(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    startDateRef.current = startDate;
  }, [startDate]);
  useEffect(() => {
    endDateRef.current = endDate;
  }, [endDate]);

  // Memoizado: solo recalcula cuando cambia viewDate
  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  const placeholderText =
    mode === 'range' ? `${dateFormat} - ${dateFormat}` : dateFormat;

  useLayoutEffect(() => {
    if (value === prevValueRef.current) return;
    if (isUserChangeRef.current) {
      isUserChangeRef.current = false;
      prevValueRef.current = value;
      return;
    }

    prevValueRef.current = value;

    const nextState = (() => {
      if (!value) {
        return {
          selectedDate: null,
          startDate: null,
          endDate: null,
          viewDate: null,
        };
      }

      if (mode === 'single') {
        const parsed = parseDateString(value);
        return {
          selectedDate: parsed,
          startDate: null,
          endDate: null,
          viewDate: parsed,
        };
      }

      const [startStr, endStr] = value.split(' - ');
      const parsedStart = parseDateString(startStr?.trim());
      const parsedEnd = parseDateString(endStr?.trim());

      return {
        selectedDate: null,
        startDate: isSameDay(parsedStart, startDateRef.current)
          ? startDateRef.current
          : parsedStart,
        endDate: isSameDay(parsedEnd, endDateRef.current)
          ? endDateRef.current
          : parsedEnd,
        viewDate: parsedStart,
      };
    })();

    queueMicrotask(() => {
      if (nextState.selectedDate !== undefined) {
        setSelectedDate(nextState.selectedDate);
      }
      if (nextState.startDate !== undefined) {
        setStartDate(nextState.startDate);
      }
      if (nextState.endDate !== undefined) {
        setEndDate(nextState.endDate);
      }
      if (nextState.viewDate) {
        setViewDate(nextState.viewDate);
      }
    });
  }, [value, mode]);

  const emitChange = useCallback(
    (newVal: string) => {
      isUserChangeRef.current = true;
      onChange?.(newVal);
    },
    [onChange],
  );

  const nextMonth = useCallback(
    () => setViewDate((prev) => addMonths(prev, 1)),
    [],
  );
  const prevMonth = useCallback(
    () => setViewDate((prev) => addMonths(prev, -1)),
    [],
  );

  const jumpToToday = useCallback(() => {
    const today = new Date();
    setViewDate(today);
    if (mode === 'single') {
      emitChange(formatDate(today));
      setIsOpen(false);
    }
  }, [mode, emitChange]);

  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minDate && !isAfterOrEqual(date, minDate)) return true;
      if (maxDate && !isBeforeOrEqual(date, maxDate)) return true;
      return false;
    },
    [minDate, maxDate],
  );

  const selectDate = useCallback(
    (date: Date) => {
      if (isDateDisabled(date)) return;

      if (mode === 'single') {
        setSelectedDate(date);
        emitChange(formatDate(date));
        setIsOpen(false);
      } else {
        const currentStart = startDateRef.current;
        const currentEnd = endDateRef.current;

        if (!currentStart || (currentStart && currentEnd)) {
          // Iniciar nuevo rango
          setStartDate(date);
          setEndDate(null);
          emitChange(`${formatDate(date)} -`);
        } else {
          // Completar rango
          if (isBeforeOrEqual(date, currentStart)) {
            setStartDate(date);
            emitChange(`${formatDate(date)} -`);
          } else {
            setEndDate(date);
            emitChange(`${formatDate(currentStart)} - ${formatDate(date)}`);
            setIsOpen(false);
          }
        }
      }
    },
    [mode, isDateDisabled, emitChange],
  );

  const clearDate = useCallback(() => {
    setSelectedDate(null);
    setStartDate(null);
    setEndDate(null);
    emitChange('');
    setIsOpen(false);
  }, [emitChange]);

  const displayValue = useMemo(() => {
    if (mode === 'single' && selectedDate)
      return formatByOrder(selectedDate, dateFormat);
    if (mode === 'range') {
      if (startDate && endDate)
        return `${formatByOrder(startDate, dateFormat)} - ${formatByOrder(endDate, dateFormat)}`;
      if (startDate) return `${formatByOrder(startDate, dateFormat)} -`;
    }
    return '';
  }, [mode, selectedDate, startDate, endDate, dateFormat]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownElement?.contains(target) || inputElement?.contains(target))
        return;
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, dropdownElement, inputElement]);

  const actions = useMemo(
    () => ({
      setIsOpen,
      setViewDate,
      nextMonth,
      prevMonth,
      selectDate,
      clearDate,
      jumpToToday,
      isDateDisabled,
    }),
    [
      setIsOpen,
      setViewDate,
      nextMonth,
      prevMonth,
      selectDate,
      clearDate,
      jumpToToday,
      isDateDisabled,
    ],
  );

  return {
    placeholderText,
    setReference,
    setCalendar,
    floatingStyles,
    state: { selectedDate, startDate, endDate, isOpen, viewDate, mode },
    actions,
    displayValue,
    calendarDays,
  };
}

export default useDatePicker;
