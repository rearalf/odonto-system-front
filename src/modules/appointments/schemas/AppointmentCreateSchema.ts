import { z } from 'zod';

import { PatientCreateSchema } from '@/modules/patients/schemas/PatientCreateSchema';

/**
 * Registro rápido de paciente: subset del schema canónico de patients.
 * El backend exige los mismos campos del POST /patients (incluido el teléfono).
 */
export const NewPatientQuickSchema = PatientCreateSchema.pick({
  firstName: true,
  lastName: true,
  middleName: true,
  birthDate: true,
  gender: true,
  phone: true,
  occupation: true,
  address: true,
  completeOdontogram: true,
  medicalHistory: true,
  allergicReactions: true,
  currentSystemicTreatment: true,
  labResults: true,
  systemEvaluationNotes: true,
  hasSncIssues: true,
  hasSvcIssues: true,
  hasSeIssues: true,
  hasSmeIssues: true,
  hasSrIssues: true,
  hasSuIssues: true,
  hasSguIssues: true,
  hasSgiIssues: true,
});

export type NewPatientQuickValues = z.infer<typeof NewPatientQuickSchema>;

/** Duraciones rápidas del walk-in (minutos). */
export const WALK_IN_DURATIONS = [15, 30, 45] as const;

export const AppointmentCreateSchema = z
  .object({
    /** Estado rector de la vista: cita regular (false) vs walk-in (true). */
    isWalkIn: z.boolean(),
    patientMode: z.enum(['search', 'new']),
    patientId: z.number().nullable(),
    newPatient: NewPatientQuickSchema,
    doctorId: z.number().nullable(),
    /** YYYY-MM-DD. En walk-in queda fijada a la fecha actual. */
    date: z.iso.date({ message: 'La fecha es obligatoria.' }),
    /** Slot elegido de GET /doctors/{id}/slots (solo cita regular). */
    slot: z
      .object({
        startTime: z.string(),
        endTime: z.string(),
      })
      .nullable(),
    /** HH:mm:ss. Solo walk-in; se prellena con la hora actual. */
    startTime: z.string(),
    /** Duración del walk-in en minutos (15/30/45). */
    duration: z.number(),
    reason: z
      .string()
      .trim()
      .min(1, 'El motivo de la consulta es obligatorio.')
      .max(255, 'El motivo no puede exceder los 255 caracteres.'),
    notes: z
      .string()
      .trim()
      .max(1000, 'Las notas no pueden exceder los 1000 caracteres.')
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.patientMode === 'search' && data.patientId == null) {
      ctx.addIssue({
        code: 'custom',
        path: ['patientId'],
        message: 'Seleccione un paciente o registre uno nuevo.',
      });
    }

    if (data.patientMode === 'new') {
      const result = NewPatientQuickSchema.safeParse(data.newPatient);
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({
            code: 'custom',
            path: ['newPatient', ...issue.path],
            message: issue.message,
          });
        }
      }
    }

    if (data.doctorId == null) {
      ctx.addIssue({
        code: 'custom',
        path: ['doctorId'],
        message: 'Seleccione un doctor.',
      });
    }

    if (!data.isWalkIn && data.slot == null) {
      ctx.addIssue({
        code: 'custom',
        path: ['slot'],
        message: 'Seleccione un horario disponible.',
      });
    }
  });

export type AppointmentCreateFormValues = z.infer<
  typeof AppointmentCreateSchema
>;
