import { z } from 'zod';

export const DoctorCreateSchema = z.object({
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
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\D/g, ''))
    .pipe(
      z
        .string()
        .regex(/^\d{8}$/, 'El teléfono debe contener exactamente 8 dígitos.'),
    ),
  qualification: z
    .string()
    .trim()
    .max(255, 'La calificación no puede exceder los 255 caracteres.')
    .optional(),
  specialties: z
    .array(
      z.object({
        specialtyId: z.number(),
        isPrimary: z.boolean(),
      }),
    )
    .optional()
    .refine(
      (val) =>
        !val || val.length === 0 || val.filter((s) => s.isPrimary).length === 1,
      'Debe haber exactamente una especialidad principal',
    ),
  // TODO: se usará más adelante
  // email: z
  //   .string()
  //   .trim()
  //   .min(1, 'El correo es obligatorio.')
  //   .pipe(z.email('El correo no es válido.')),
  // roles: z
  //   .array(z.number(), 'Los roles son obligatorios.')
  //   .min(1, 'Debe seleccionar al menos un rol.'),
});

export type DoctorCreateFormValues = z.infer<typeof DoctorCreateSchema>;
