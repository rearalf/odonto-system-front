import type { DayOfWeek } from '../types/Availability';

export const DAYS_OF_WEEK: {
  value: DayOfWeek;
  label: string;
  shortLabel: string;
}[] = [
  { value: 0, label: 'Domingo', shortLabel: 'Dom' },
  { value: 1, label: 'Lunes', shortLabel: 'Lun' },
  { value: 2, label: 'Martes', shortLabel: 'Mar' },
  { value: 3, label: 'Miércoles', shortLabel: 'Mié' },
  { value: 4, label: 'Jueves', shortLabel: 'Jue' },
  { value: 5, label: 'Viernes', shortLabel: 'Vie' },
  { value: 6, label: 'Sábado', shortLabel: 'Sáb' },
];

export const DEFAULT_SLOT_DURATION = 30;
export const DEFAULT_MAX_PATIENTS_PER_SLOT = 1;
export const VALID_SLOT_DURATIONS = [15, 20, 30, 45, 60] as const;
