import type { TimePickerState } from '../types/TimePickerField';

export function parseTime12Hour(
  val: string,
): { h: number; m: number; s: number; pm: boolean } | null {
  const match = val.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const s = match[3] ? parseInt(match[3], 10) : 0;
  const pm = match[4].toUpperCase() === 'PM';
  if (h === 12) h = pm ? 12 : 0;
  else if (pm) h += 12;
  return { h, m, s, pm };
}

export function parseTime24Hour(
  val: string,
): { h: number; m: number; s: number } | null {
  const parts = val.split(':').map(Number);
  if (parts.length < 2) return null;
  return { h: parts[0] ?? 0, m: parts[1] ?? 0, s: parts[2] ?? 0 };
}

export function getInitialState(use12Hour: boolean): TimePickerState {
  return {
    hours: use12Hour ? 12 : 0,
    minutes: 0,
    seconds: 0,
    period: 'AM',
    isOpen: false,
  };
}
