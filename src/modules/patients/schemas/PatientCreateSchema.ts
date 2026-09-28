import { z } from 'zod';

import { GenderType } from '@/modules/patients/enums/GenderType';

export const PatientCreateSchema = z.object({
  profilePicture: z.instanceof(File).nullable(),
  firstName: z
    .string()
    .trim()
    .min(1, 'El primer nombre es obligatorio.')
    .max(255, 'El primer nombre no puede exceder los 255 caracteres.'),
  middleName: z
    .string()
    .trim()
    .max(255, 'El segundo nombre no puede exceder los 255 caracteres.')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'El apellido es obligatorio.')
    .max(255, 'El apellido no puede exceder los 255 caracteres.'),
  birthDate: z.iso.date({ message: 'La fecha de nacimiento es obligatoria.' }),
  gender: z.enum(
    [GenderType.MALE, GenderType.FEMALE, GenderType.OTHER],
    { message: 'El género es obligatorio.' },
  ),
  phone: z
    .string()
    .trim()
    .regex(/^\d{8}$/, 'El teléfono debe contener exactamente 8 dígitos.'),
  occupation: z
    .string()
    .trim()
    .max(50, 'La ocupación no puede exceder los 50 caracteres.')
    .optional(),
  address: z
    .string()
    .trim()
    .max(100, 'La dirección no puede exceder los 100 caracteres.')
    .optional(),
  medicalHistory: z.string().trim().optional(),
  allergicReactions: z.string().trim().optional(),
  currentSystemicTreatment: z.string().trim().optional(),
  labResults: z.string().trim().optional(),
  systemEvaluationNotes: z
    .string()
    .trim()
    .max(255, 'Las notas de evaluación no pueden exceder los 255 caracteres.')
    .optional(),
  completeOdontogram: z.boolean(),
  hasSncIssues: z.boolean(),
  hasSvcIssues: z.boolean(),
  hasSeIssues: z.boolean(),
  hasSmeIssues: z.boolean(),
  hasSrIssues: z.boolean(),
  hasSuIssues: z.boolean(),
  hasSguIssues: z.boolean(),
  hasSgiIssues: z.boolean(),
});

export type PatientCreateFormValues = z.infer<typeof PatientCreateSchema>;