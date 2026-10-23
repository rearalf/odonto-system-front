import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { UseDatePickerOptions } from '../types/DatePickerField';
import {
  addMonths,
  formatByOrder,
  formatDate,
  getCalendarDays,
  isAfterOrEqual,
  isBeforeOrEqual,
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Se parsea el valor inicial: el componente puede montarse ya con valor (modo edición)
  const [initialParsed] = useState(() => {
    if (!value) return { single: null, start: null, end: null };
    if (mode === 'single')
      return { single: parseDateString(value), start: null, end: null };
    const [startStr, endStr] = value.split(' - ');
    return {
      single: null,
      start: parseDateString(startStr),
      end: parseDateString(endStr),
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

  const [prevValue, setPrevValue] = useState(value);

  const calendarDays = getCalendarDays(viewDate);

  const placeholderText =
    mode === 'range' ? `${dateFormat} - ${dateFormat}` : dateFormat;

  if (value !== prevValue) {
    setPrevValue(value);

    if (!value) {
      setSelectedDate(null);
      setStartDate(null);
      setEndDate(null);
    } else if (mode === 'single') {
      const parsed = parseDateString(value);
      setSelectedDate(parsed);
      if (parsed) setViewDate(parsed);
    } else {
      const [startStr, endStr] = value.split(' - ');
      const parsedStart = parseDateString(startStr);
      const parsedEnd = parseDateString(endStr);
      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      if (parsedStart) setViewDate(parsedStart);
    }
  }

  const emitChange = (newVal: string) => {
    if (onChange) onChange(newVal);
  };

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
  }, [mode, onChange]);

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
        // Lógica para modo Rango
        if (!startDate || (startDate && endDate)) {
          // Iniciar nuevo rango
          setStartDate(date);
          setEndDate(null);
          emitChange(`${formatDate(date)} -`);
        } else {
          // Completar rango
          if (isBeforeOrEqual(date, startDate)) {
            // Si hace clic en una fecha anterior, reinicia el inicio
            setStartDate(date);
            emitChange(`${formatDate(date)} -`);
          } else {
            setEndDate(date);
            emitChange(`${formatDate(startDate)} - ${formatDate(date)}`);
            setIsOpen(false); // Cierra automáticamente al completar el rango
          }
        }
      }
    },
    [mode, startDate, endDate, isDateDisabled, onChange],
  );

  const clearDate = useCallback(() => {
    setSelectedDate(null);
    setStartDate(null);
    setEndDate(null);
    emitChange('');
    setIsOpen(false);
  }, [onChange]);

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
      // Verifica que el clic NO sea dentro del modal ni dentro del input
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return {
    placeholderText,
    dropdownRef,
    inputRef,
    state: { selectedDate, startDate, endDate, isOpen, viewDate, mode },
    actions: {
      setIsOpen,
      setViewDate,
      nextMonth,
      prevMonth,
      selectDate,
      clearDate,
      jumpToToday,
      isDateDisabled,
    },
    displayValue,
    calendarDays,
  };
}

export default useDatePicker;
