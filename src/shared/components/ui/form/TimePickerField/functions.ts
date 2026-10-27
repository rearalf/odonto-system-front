import type { TimePickerState } from '../types/TimePickerField';

function parseTime12Hour(
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

function parseTime24Hour(
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

export function getParsedState(
  value: string | undefined,
  use12Hour: boolean,
  accept12HourInput: boolean,
): TimePickerState {
  if (!value) return getInitialState(use12Hour);
  let parsed: { h: number; m: number; s: number; pm?: boolean } | null = null;

  if (accept12HourInput && use12Hour) {
    parsed = parseTime12Hour(value);
  }
  if (!parsed) {
    parsed = parseTime24Hour(value);
  }

  if (parsed) {
    const isPm = parsed.pm !== undefined ? parsed.pm : parsed.h >= 12;
    // Lógica segura para convertir a 12h
    let h12 = parsed.h;
    if (use12Hour) {
      h12 = parsed.h % 12 || 12;
    }
    return {
      hours: use12Hour ? h12 : parsed.h,
      minutes: parsed.m,
      seconds: parsed.s,
      period: use12Hour ? (isPm ? 'PM' : 'AM') : 'AM',
      isOpen: false,
    };
  }
  return getInitialState(use12Hour);
}
