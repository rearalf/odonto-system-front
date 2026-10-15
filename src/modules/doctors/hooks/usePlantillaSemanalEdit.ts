'use no memo';

import { useEffect, useRef } from 'react';
import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';

import {
  weeklyScheduleSchema,
  createEmptyBlock,
  blocksToPayload,
  type WeeklyScheduleFormValues,
  type AvailabilityBlockFormValues,
} from '@/modules/doctors/schemas/AvailabilitySchema';
import {
  type DayOfWeek,
  DAYS_OF_WEEK,
  DEFAULT_SLOT_DURATION,
  DEFAULT_MAX_PATIENTS_PER_SLOT,
} from '@/modules/doctors/types/Availability';
import { useDoctorAvailabilityQuery } from '@/modules/doctors/hooks/queries/useDoctorAvailabilityQuery';
import { useDoctorAvailabilityBulkMutation } from '@/modules/doctors/hooks/mutations/useDoctorAvailabilityBulkMutation';
import { useDoctorDetailQuery } from '@/modules/doctors/hooks/queries/useDoctorDetailQuery';
import {
  showLoading,
  showSuccess,
  showApiError,
} from '@/shared/components/feedback';

export function usePlantillaSemanalEdit() {
  const { id: doctorId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bulkMutation = useDoctorAvailabilityBulkMutation();

  const {
    data: doctor,
    isLoading: isLoadingDoctor,
    isError: isErrorDoctor,
  } = useDoctorDetailQuery(doctorId);
  const query = useDoctorAvailabilityQuery(doctorId);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<WeeklyScheduleFormValues>({
    resolver: zodResolver(weeklyScheduleSchema),
    defaultValues: { blocks: [] },
    mode: 'onChange',
  });

  const blocks = useWatch({ control, name: 'blocks' });

  useEffect(() => {
    if (query.data && Array.isArray(query.data)) {
      const recurringBlocks = query.data.filter((b) => b.isRecurring);
      if (recurringBlocks.length > 0) {
        const formBlocks = recurringBlocks.map((b) => ({
          startTime: b.startTime,
          endTime: b.endTime,
          slotDuration: b.slotDuration,
          maxPatientsPerSlot: b.maxPatientsPerSlot,
          isRecurring: b.isRecurring,
          dayOfWeek: b.dayOfWeek,
        }));
        reset({ blocks: formBlocks });
      }
    }
  }, [query.data, reset]);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (
      !initializedRef.current &&
      query.data &&
      Array.isArray(query.data) &&
      query.data.some((b) => b.isRecurring)
    ) {
      if (blocks.length === 0) {
        const recurringBlocks = query.data.filter((b) => b.isRecurring);
        const formBlocks = recurringBlocks.map((b) => ({
          startTime: b.startTime,
          endTime: b.endTime,
          slotDuration: b.slotDuration,
          maxPatientsPerSlot: b.maxPatientsPerSlot,
          isRecurring: b.isRecurring,
          dayOfWeek: b.dayOfWeek,
        }));
        reset({ blocks: formBlocks });
        initializedRef.current = true;
      }
    }
  }, [query.data, reset, blocks]);

  const { append, remove } = useFieldArray({
    control,
    name: 'blocks',
  });

  const getShiftsForDay = (dayOfWeek: DayOfWeek) => {
    return blocks
      .map((block, index) => ({ block, index }))
      .filter(({ block }) => block.dayOfWeek === dayOfWeek);
  };

  const addShift = (dayOfWeek: DayOfWeek) => {
    append(createEmptyBlock(dayOfWeek));
  };

  const removeShift = (blockIndex: number) => {
    remove(blockIndex);
  };

  const updateBlock = (
    blockIndex: number,
    updates: Partial<AvailabilityBlockFormValues>,
  ) => {
    const newBlocks = blocks.map((b, i) =>
      i === blockIndex ? { ...b, ...updates } : b,
    );
    setValue('blocks', newBlocks);
  };

  const onSubmit = handleSubmit(async (data) => {
    const payload = blocksToPayload(data.blocks);
    const toastId = showLoading('Guardando plantilla semanal…', {
      description: 'Enviando cambios al servidor',
    });

    try {
      if (!doctorId) {
        throw new Error('ID de doctor no encontrado');
      }
      await bulkMutation.mutateAsync({ doctorId, payload });
      showSuccess('Plantilla guardada', {
        id: toastId,
        description: 'La plantilla semanal se actualizó correctamente',
      });
      navigate(-1);
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  });

  const handleCancel = () => navigate(-1);

  const fullName = doctor
    ? [
        doctor.person?.firstName,
        doctor.person?.middleName,
        doctor.person?.lastName,
      ]
        .filter(Boolean)
        .join(' ')
    : undefined;

  const breadcrumbsItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Doctores', href: '/doctors' },
    {
      label: `Dr. ${doctor && doctor.person ? doctor.person.firstName : ''} ${doctor && doctor.person ? doctor.person?.lastName : ''}`,
      href: `/doctors/${doctor?.id}`,
    },
    { label: 'Editar Plantilla Semanal' },
  ];

  return {
    breadcrumbsItems,
    doctor,
    fullName,
    isLoadingDoctor,
    isErrorDoctor,
    control,
    errors,
    isSubmitting: isSubmitting || bulkMutation.isPending,
    onSubmit,
    handleCancel,
    blocks,
    getShiftsForDay,
    addShift,
    removeShift,
    updateBlock,
    isPending: bulkMutation.isPending,
    DAYS_OF_WEEK,
    DEFAULT_SLOT_DURATION,
    DEFAULT_MAX_PATIENTS_PER_SLOT,
  };
}
