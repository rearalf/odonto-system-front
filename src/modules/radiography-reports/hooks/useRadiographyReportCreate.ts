'use no memo';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInYears, format, parseISO, subYears } from 'date-fns';
import { type z } from 'zod';

import {
  RadiographyReportSchema,
  type RadiographyReportFormValuesInferred,
} from '@/modules/radiography-reports/schemas/RadiographyReportSchema';
import type {
  RadiographType,
  RadiographyReportPayload,
} from '@/modules/radiography-reports/types/RadiographyReport';
import { useRadiographyReportCreateMutation } from '@/modules/radiography-reports/hooks/mutations/useRadiographyReportCreateMutation';
import {
  showApiError,
  showLoading,
  showSuccess,
} from '@/shared/components/feedback';

export const RADIOGRAPH_KEYS: RadiographType[] = [
  'periapical',
  'panoramic',
  'bitewing',
  'occlusal',
  'cephalometric',
  'cbct',
];

export function useRadiographyReportCreate() {
  const generatePdf = useRadiographyReportCreateMutation();
  const maxBirthDate = subYears(new Date(), 1);
  const maxBirthFormatDate = format(subYears(new Date(), 1), 'yyyy-MM-dd');

  const form = useForm<
    z.input<typeof RadiographyReportSchema>,
    unknown,
    RadiographyReportFormValuesInferred
  >({
    resolver: zodResolver(RadiographyReportSchema),
    defaultValues: {
      fullName: '',
      birthDate: maxBirthFormatDate,
      phone: '',
      periapical: false,
      panoramic: false,
      bitewing: false,
      occlusal: false,
      cephalometric: false,
      cbct: false,
    },
  });

  const { register, control, setValue, formState } = form;
  const { errors } = formState;

  const birthDate = useWatch({ control, name: 'birthDate' });
  const watchedRadiographs = useWatch({ control, name: RADIOGRAPH_KEYS });

  const age = birthDate
    ? differenceInYears(new Date(), parseISO(birthDate))
    : null;

  const selectedCount = watchedRadiographs.filter(Boolean).length;
  const allSelected = selectedCount === RADIOGRAPH_KEYS.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const setBirthDate = (value: string) =>
    setValue('birthDate', value, { shouldValidate: true, shouldDirty: true });

  const toggleAllRadiographs = () => {
    const nextValue = !allSelected;
    RADIOGRAPH_KEYS.forEach((key) => {
      setValue(key, nextValue, { shouldValidate: true, shouldDirty: true });
    });
  };

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const clearPdfUrl = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    const payload: RadiographyReportPayload = {
      fullName: data.fullName,
      age: age ?? 0,
      phone: data.phone,
      radiographs: {
        periapical: data.periapical,
        panoramic: data.panoramic,
        bitewing: data.bitewing,
        occlusal: data.occlusal,
        cephalometric: data.cephalometric,
        cbct: data.cbct,
      },
    };

    const toastId = showLoading('Generando PDF…', {
      description: 'Generando el reporte de radiografías',
    });

    try {
      const blob = await generatePdf.mutateAsync(payload);

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      const newPdfUrl = URL.createObjectURL(blob);
      setPdfUrl(newPdfUrl);

      showSuccess('PDF generado', {
        id: toastId,
        description: 'El reporte de radiografías se generó correctamente.',
      });
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  });

  const handleCancel = () => {
    form.reset();
    clearPdfUrl();
  };

  return {
    register,
    control,
    errors,
    isSubmitting: formState.isSubmitting || generatePdf.isPending,
    onSubmit,
    handleCancel,
    birthDate,
    setBirthDate,
    age,
    maxBirthDate,
    pdfUrl,
    clearPdfUrl,
    allSelected,
    someSelected,
    toggleAllRadiographs,
  };
}
