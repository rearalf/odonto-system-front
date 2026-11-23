import { z } from 'zod';
import { subYears, parseISO } from 'date-fns';

export const RadiographyReportSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, 'El nombre completo es obligatorio.')
      .max(255, 'El nombre completo no puede exceder los 255 caracteres.'),
    birthDate: z.iso
      .date({ message: 'La fecha de nacimiento es obligatoria.' })
      .refine(
        (date) => parseISO(date) <= subYears(new Date(), 1),
        'La persona debe tener al menos 1 año de edad.',
      ),
    phone: z
      .string()
      .trim()
      .min(1, 'El teléfono es obligatorio.')
      .max(50, 'El teléfono no puede exceder los 50 caracteres.'),
    periapical: z.boolean().default(false),
    panoramic: z.boolean().default(false),
    bitewing: z.boolean().default(false),
    occlusal: z.boolean().default(false),
    cephalometric: z.boolean().default(false),
    cbct: z.boolean().default(false),
  })
  .refine(
    (data) =>
      data.periapical ||
      data.panoramic ||
      data.bitewing ||
      data.occlusal ||
      data.cephalometric ||
      data.cbct,
    {
      message: 'Debes seleccionar al menos un tipo de radiografía.',
      path: ['radiographs'],
    },
  );

export type RadiographyReportFormValuesInferred = z.infer<
  typeof RadiographyReportSchema
>;
