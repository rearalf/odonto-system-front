import { z } from 'zod';

import { PatientCreateSchema } from '@/modules/patients/schemas/PatientCreateSchema';

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

export const WALK_IN_DURATIONS = [15, 30, 45] as const;

export const AppointmentCreateSchema = z
  .object({
    isWalkIn: z.boolean(),
    patientMode: z.enum(['search', 'new']),
    patientId: z.number().nullable(),
    newPatient: NewPatientQuickSchema.optional(),
    doctorId: z.number().nullable(),
    date: z.iso.date({ message: 'La fecha es obligatoria.' }),
    slot: z
      .object({
        startTime: z.string(),
        endTime: z.string(),
      })
      .nullable(),
    startTime: z.string(),
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
