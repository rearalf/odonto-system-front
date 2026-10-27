import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  unavailabilityFormSchema,
  type UnavailabilityFormFormValues,
} from '@/modules/doctors/schemas/UnavailabilitySchema';
import { useDoctorUnavailabilityCreateMutation } from '@/modules/doctors/hooks/mutations/useDoctorUnavailabilityCreateMutation';
import { useDoctorUnavailabilityUpdateMutation } from '@/modules/doctors/hooks/mutations/useDoctorUnavailabilityUpdateMutation';
import {
  showLoading,
  showSuccess,
  showApiError,
} from '@/shared/components/feedback';
import type { UseUnavailabilityFormProps } from '../types/Unavailability';

export function useExcepcionForm({
  doctorId,
  initialData,
  isEditing,
  onClose,
  onSuccess,
}: UseUnavailabilityFormProps) {
  const createMutation = useDoctorUnavailabilityCreateMutation();
  const updateMutation = useDoctorUnavailabilityUpdateMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<UnavailabilityFormFormValues>({
    resolver: zodResolver(unavailabilityFormSchema),
    defaultValues: {
      startDate: '',
      startTime: '08:00:00',
      endDate: '',
      endTime: '14:00:00',
      reason: '',
    },
    mode: 'onChange',
  });

  const startDate = useWatch({ control, name: 'startDate' });
  const startTime = useWatch({ control, name: 'startTime' });
  const endDate = useWatch({ control, name: 'endDate' });
  const endTime = useWatch({ control, name: 'endTime' });
  const reason = useWatch({ control, name: 'reason' });

  useEffect(() => {
    if (initialData) {
      const start = new Date(initialData.startTime);
      const end = new Date(initialData.endTime);
      reset({
        startDate: start.toISOString().split('T')[0],
        startTime: start.toTimeString().slice(0, 8),
        endDate: end.toISOString().split('T')[0],
        endTime: end.toTimeString().slice(0, 8),
        reason: initialData.reason,
      });
    }
  }, [initialData, reset]);

  const combineDateTime = (dateStr: string, timeStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const localDate = new Date(year, month - 1, day, hours, minutes, seconds);
    return localDate.toISOString();
  };

  const onSubmit = handleSubmit(async (values) => {
    const toastId = showLoading(isEditing ? 'Actualizando…' : 'Creando…', {
      description: 'Procesando...',
    });
    try {
      const startISO = combineDateTime(values.startDate, values.startTime);
      const endISO = combineDateTime(values.endDate, values.endTime);
      const payload = {
        startTime: startISO,
        endTime: endISO,
        reason: values.reason,
      };

      if (isEditing && initialData?.id) {
        await updateMutation.mutateAsync({
          doctorId,
          id: initialData.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync({ doctorId, payload });
      }

      showSuccess(isEditing ? 'Actualizado' : 'Creado', {
        id: toastId,
        description: `La excepción se ha ${isEditing ? 'actualizado' : 'creado'} correctamente`,
      });
      onClose();
      onSuccess?.();
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  });

  const isSubmitting =
    isFormSubmitting || createMutation.isPending || updateMutation.isPending;

  const handleStartDateChange = useCallback(
    (value: string) => {
      setValue('startDate', value, { shouldValidate: true });
    },
    [setValue],
  );

  const handleEndDateChange = useCallback(
    (value: string) => {
      setValue('endDate', value, { shouldValidate: true });
    },
    [setValue],
  );

  const handleReasonChange = useCallback(
    (value: string) => {
      setValue('reason', value, { shouldValidate: true });
    },
    [setValue],
  );

  return {
    control,
    errors,
    onSubmit,
    isSubmitting,
    reset,
    setValue,
    watch,
    startDate,
    startTime,
    endDate,
    endTime,
    reason,
    handleStartDateChange,
    handleEndDateChange,
    handleReasonChange,
  };
}
