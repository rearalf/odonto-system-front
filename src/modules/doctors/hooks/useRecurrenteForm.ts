import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  availabilityBlockSchema,
  type AvailabilityBlockFormValues,
} from '@/modules/doctors/schemas/AvailabilitySchema';
import { useDoctorAvailabilityCreateMutation } from '@/modules/doctors/hooks/mutations/useDoctorAvailabilityCreateMutation';
import { useDoctorAvailabilityUpdateMutation } from '@/modules/doctors/hooks/mutations/useDoctorAvailabilityUpdateMutation';
import type { UseRecurrenteFormProps } from '@/modules/doctors/types/availabilityModal';
import {
  showLoading,
  showSuccess,
  showApiError,
} from '@/shared/components/feedback';

export function useRecurrenteForm({
  doctorId,
  initialData,
  isEditing,
  onClose,
  onSuccess,
}: UseRecurrenteFormProps) {
  const createMutation = useDoctorAvailabilityCreateMutation();
  const updateMutation = useDoctorAvailabilityUpdateMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<AvailabilityBlockFormValues>({
    resolver: zodResolver(availabilityBlockSchema),
    defaultValues: {
      startTime: '08:00:00',
      endTime: '14:00:00',
      slotDuration: 30,
      maxPatientsPerSlot: 1,
      isRecurring: true,
      dayOfWeek: 1,
      specificDate: null,
    },
    mode: 'onChange',
  });

  const startTime = useWatch({ control, name: 'startTime' });
  const endTime = useWatch({ control, name: 'endTime' });
  const slotDuration = useWatch({ control, name: 'slotDuration' });
  const maxPatientsPerSlot = useWatch({ control, name: 'maxPatientsPerSlot' });
  const isRecurring = useWatch({ control, name: 'isRecurring' });
  const specificDate = useWatch({ control, name: 'specificDate' });

  useEffect(() => {
    if (initialData) {
      reset({
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        slotDuration: initialData.slotDuration,
        maxPatientsPerSlot: initialData.maxPatientsPerSlot,
        isRecurring: initialData.isRecurring,
        dayOfWeek: initialData.dayOfWeek,
        specificDate: initialData.specificDate,
      });
    }
  }, [initialData, reset]);

  const onSubmit = handleSubmit(async (values) => {
    const toastId = showLoading(isEditing ? 'Actualizando…' : 'Creando…', {
      description: 'Procesando...',
    });
    try {
      const payload = {
        startTime: values.startTime,
        endTime: values.endTime,
        slotDuration: values.slotDuration,
        maxPatientsPerSlot: values.maxPatientsPerSlot,
        isRecurring: values.isRecurring,
        ...(values.isRecurring
          ? { dayOfWeek: values.dayOfWeek }
          : { specificDate: values.specificDate }),
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
        description: `El bloque recurrente se ha ${isEditing ? 'actualizado' : 'creado'} correctamente`,
      });
      onClose();
      onSuccess?.();
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  });

  const isSubmitting =
    isFormSubmitting || createMutation.isPending || updateMutation.isPending;

  const handleDayOfWeekChange = useCallback(
    (value: number) => {
      setValue('dayOfWeek', value, { shouldValidate: true });
    },
    [setValue],
  );

  const handleSlotDurationChange = useCallback(
    (value: number) => {
      setValue('slotDuration', value || 30, { shouldValidate: true });
    },
    [setValue],
  );

  const handleMaxPatientsChange = useCallback(
    (value: number) => {
      setValue('maxPatientsPerSlot', value || 1, { shouldValidate: true });
    },
    [setValue],
  );

  const handleSpecificDateChange = useCallback(
    (value: string) => {
      setValue('specificDate', value || null, { shouldValidate: true });
    },
    [setValue],
  );

  const handleIsRecurringChange = useCallback(
    (value: boolean) => {
      setValue('isRecurring', value, { shouldValidate: true });
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
    startTime,
    endTime,
    slotDuration,
    maxPatientsPerSlot,
    isRecurring,
    specificDate,
    handleDayOfWeekChange,
    handleSlotDurationChange,
    handleMaxPatientsChange,
    handleSpecificDateChange,
    handleIsRecurringChange,
  };
}
