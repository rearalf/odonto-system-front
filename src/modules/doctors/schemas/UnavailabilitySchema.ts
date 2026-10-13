import { z } from 'zod';

const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

export const unavailabilitySchema = z.object({
  startTime: z
    .string()
    .min(1, 'Fecha y hora de inicio es requerida')
    .regex(isoDateTimeRegex, 'Formato de fecha inválido (ISO 8601)'),
  endTime: z
    .string()
    .min(1, 'Fecha y hora de fin es requerida')
    .regex(isoDateTimeRegex, 'Formato de fecha inválido (ISO 8601)'),
  reason: z
    .string()
    .trim()
    .min(1, 'El motivo es obligatorio')
    .max(255, 'El motivo no puede exceder 255 caracteres'),
});

export const unavailabilityUpdateSchema = unavailabilitySchema.partial();

export type UnavailabilityFormValues = z.infer<typeof unavailabilitySchema>;
export type UnavailabilityUpdateFormValues = z.infer<typeof unavailabilityUpdateSchema>;

export function formatToISODateTime(date: Date): string {
  return date.toISOString();
}

export function parseISODateTime(isoString: string): Date {
  return new Date(isoString);
}

export function getDefaultDateRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return { start, end };
}