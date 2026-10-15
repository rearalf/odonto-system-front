import { z } from 'zod';
import type { DayOfWeek } from '@/modules/doctors/types/Availability';

const timeStringRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

const availabilityBlockSchema = z.object({
  startTime: z
    .string()
    .regex(timeStringRegex, 'Formato de hora inválido (HH:mm:ss)')
    .refine((val) => val !== '', 'Hora de inicio es requerida'),
  endTime: z
    .string()
    .regex(timeStringRegex, 'Formato de hora inválido (HH:mm:ss)')
    .refine((val) => val !== '', 'Hora de fin es requerida'),
  slotDuration: z
    .number()
    .int('La duración debe ser un número entero')
    .min(5, 'La duración mínima es 5 minutos')
    .max(120, 'La duración máxima es 120 minutos')
    .refine(
      (val) => [15, 20, 30, 45, 60].includes(val),
      'Duración debe ser 15, 20, 30, 45 o 60 minutos',
    ),
  maxPatientsPerSlot: z
    .number()
    .int('Debe ser un número entero')
    .min(1, 'Debe ser al menos 1 paciente por turno'),
  isRecurring: z.boolean(),
  dayOfWeek: z.number().int().min(0).max(6),
});

export const weeklyScheduleSchema = z.object({
  blocks: z
    .array(availabilityBlockSchema)
    .min(1, 'Debe agregar al menos un bloque de horario'),
});

export type WeeklyScheduleFormValues = z.infer<typeof weeklyScheduleSchema>;
export type AvailabilityBlockFormValues = z.infer<
  typeof availabilityBlockSchema
>;

export function createEmptyBlock(
  dayOfWeek: DayOfWeek,
): AvailabilityBlockFormValues {
  return {
    startTime: '08:00:00',
    endTime: '13:00:00',
    slotDuration: 30,
    maxPatientsPerSlot: 1,
    isRecurring: true,
    dayOfWeek,
  };
}

export function blocksToPayload(blocks: AvailabilityBlockFormValues[]) {
  return {
    blocks: blocks.map((b) => ({
      startTime: b.startTime,
      endTime: b.endTime,
      slotDuration: b.slotDuration,
      maxPatientsPerSlot: b.maxPatientsPerSlot,
      isRecurring: b.isRecurring,
      dayOfWeek: b.dayOfWeek,
    })),
  };
}

export function payloadToBlocks(payload: {
  blocks: AvailabilityBlockFormValues[];
}): AvailabilityBlockFormValues[] {
  return payload.blocks.map((b) => ({
    startTime: b.startTime,
    endTime: b.endTime,
    slotDuration: b.slotDuration,
    maxPatientsPerSlot: b.maxPatientsPerSlot,
    isRecurring: b.isRecurring,
    dayOfWeek: b.dayOfWeek as DayOfWeek,
  }));
}
