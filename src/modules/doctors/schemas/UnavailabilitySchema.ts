import { z } from 'zod';

const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
const timeStringRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

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

export const unavailabilityFormSchema = z.object({
  startDate: z.string().min(1, 'Fecha de inicio es requerida'),
  startTime: z
    .string()
    .regex(timeStringRegex, 'Formato HH:mm:ss')
    .refine((v) => v !== '', 'Hora de inicio es requerida'),
  endDate: z.string().min(1, 'Fecha de fin es requerida'),
  endTime: z
    .string()
    .regex(timeStringRegex, 'Formato HH:mm:ss')
    .refine((v) => v !== '', 'Hora de fin es requerida'),
  reason: z
    .string()
    .trim()
    .min(1, 'El motivo es obligatorio')
    .max(255, 'El motivo no puede exceder 255 caracteres'),
});

export type UnavailabilityFormValues = z.infer<typeof unavailabilitySchema>;
export type UnavailabilityUpdateFormValues = z.infer<typeof unavailabilityUpdateSchema>;
export type UnavailabilityFormFormValues = z.infer<typeof unavailabilityFormSchema>;

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