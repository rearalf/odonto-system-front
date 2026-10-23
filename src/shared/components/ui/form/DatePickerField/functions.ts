export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateString(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);
  const date = new Date(year, month, day);
  return date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
    ? date
    : null;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isAfterOrEqual(d1: Date, d2: Date): boolean {
  const resetD1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const resetD2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return resetD1 >= resetD2;
}

export function isBeforeOrEqual(d1: Date, d2: Date): boolean {
  const resetD1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const resetD2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return resetD1 <= resetD2;
}

export function isWithinRange(
  date: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start || !end) return false;
  return isAfterOrEqual(date, start) && isBeforeOrEqual(date, end);
}

// Genera un arreglo de 42 días (6 semanas) para rellenar la cuadrícula del calendario
export function getCalendarDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  // Padding del mes anterior (de Domingo a Sábado)
  const startPadding = firstDay.getDay();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startPadding - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  // Días del mes actual
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  // Padding del mes siguiente para completar 42 celdas
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
  }

  return days;
}

export function formatByOrder(date: Date, format: string) {
  const yyyy = date.getFullYear().toString();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  switch (format) {
    case 'DD-MM-YYYY':
      return `${dd}-${mm}-${yyyy}`;
    case 'MM-DD-YYYY':
      return `${mm}-${dd}-${yyyy}`;
    case 'DD/MM/YYYY':
      return `${dd}/${mm}/${yyyy}`;
    case 'MM/DD/YYYY':
      return `${mm}/${dd}/${yyyy}`;
    case 'YYYY-MM-DD':
    default:
      return `${yyyy}-${mm}-${dd}`;
  }
}
