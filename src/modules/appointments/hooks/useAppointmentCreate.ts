'use no memo';

import { useMemo, useState, useCallback } from 'react';
import {
  useForm,
  useWatch,
  type DefaultValues,
  type Resolver,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMinutes, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { usePatientCreateMutation } from '@/modules/patients/hooks/mutations/usePatientCreateMutation';
import {
  showApiError,
  showLoading,
  showSuccess,
  showError,
} from '@/shared/components/feedback';
import { useAppointmentCreateMutation } from './mutations/useAppointmentCreateMutation';
import {
  AppointmentCreateSchema,
  type AppointmentCreateFormValues,
  type NewPatientQuickValues,
} from '../schemas/AppointmentCreateSchema';
import { type PatientCardData } from '@/modules/appointments/types';
import { useDoctorSlotsQuery } from '@/modules/doctors/hooks/queries/useDoctorSlotsQuery';
import { useDoctorListQuery } from '@/modules/doctors/hooks/queries/useDoctorListQuery';
import { useAppointmentStatusesQuery } from './queries/useAppointmentStatusesQuery';
import type { DoctorListItem } from '@/modules/doctors/types/Doctor';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import { differenceInYears } from 'date-fns';

import {
  currentTime,
  DEFAULT_VALUES,
  today,
} from '../constants/CreateAppointment';

function useAppointmentCreate() {
  const navigate = useNavigate();
  const createPatient = usePatientCreateMutation();
  const createAppointment = useAppointmentCreateMutation();

  const doctors = useDoctorListQuery({ page: 1, perPage: 100 });
  const statuses = useAppointmentStatusesQuery();
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [patientCardData, setPatientCardData] = useState<PatientCardData>(null);
  const [overbookingConflict, setOverbookingConflict] = useState(false);

  const form = useForm<AppointmentCreateFormValues>({
    resolver: zodResolver(
      AppointmentCreateSchema,
    ) as unknown as Resolver<AppointmentCreateFormValues>,
    defaultValues: DEFAULT_VALUES as DefaultValues<AppointmentCreateFormValues>,
  });

  const isWalkIn = useWatch({ control: form.control, name: 'isWalkIn' });
  const doctorId = useWatch({ control: form.control, name: 'doctorId' });
  const date = useWatch({ control: form.control, name: 'date' });
  const startTime =
    useWatch({ control: form.control, name: 'startTime' }) || currentTime();
  const duration = useWatch({ control: form.control, name: 'duration' });
  const slotsQuery = useDoctorSlotsQuery(
    !isWalkIn && doctorId && date ? { doctorId, date } : undefined,
  );
  const patientMode = useWatch({
    control: form.control,
    name: 'patientMode',
  });
  const newPatient = useWatch({
    control: form.control,
    name: 'newPatient',
  });

  const patientId = useWatch({
    control: form.control,
    name: 'patientId',
  });
  const slot = useWatch({ control: form.control, name: 'slot' });
  const statusId = useWatch({ control: form.control, name: 'statusId' });
  const allowOverbooking = useWatch({
    control: form.control,
    name: 'allow_overbooking',
  });

  const endTime = useMemo(() => {
    const [hours, minutes, seconds = '00'] = startTime.split(':').map(Number);
    if ([hours, minutes, Number(seconds)].some(Number.isNaN)) return '';
    const value = new Date();
    value.setHours(hours, minutes, Number(seconds), 0);
    return format(addMinutes(value, duration), 'HH:mm:ss');
  }, [duration, startTime]);

  const toUTCISO = useCallback((dateStr: string, timeStr: string) => {
    return new Date(`${dateStr}T${timeStr}`).toISOString();
  }, []);

  const getStatusIdForWalkIn = useCallback(
    (walkIn: boolean) => {
      if (!statuses.data) return 1;
      const validNames = walkIn
        ? ['waiting', 'in_progress']
        : ['scheduled', 'confirmed'];
      const status = statuses.data.find((s) => validNames.includes(s.name));
      return status?.id ?? 1;
    },
    [statuses.data],
  );

  const computeEndTime = (start: string, dur: number) => {
    const [h, m, s = '00'] = start.split(':').map(Number);
    if ([h, m, Number(s)].some(Number.isNaN)) return '';
    const dt = new Date();
    dt.setHours(h, m, Number(s), 0);
    return format(addMinutes(dt, dur), 'HH:mm:ss');
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const toastId = showLoading('Guardando cita…', {
      description: values.isWalkIn
        ? 'Registrando atención walk-in'
        : 'Agendando consulta',
    });

    try {
      const formData = new FormData();

      const selectedSlot = values.slot;
      const walkInStart = values.startTime;
      const walkInEnd = computeEndTime(walkInStart, values.duration);
      const slotStart = selectedSlot?.startTime ?? '';
      const slotEnd = selectedSlot?.endTime ?? '';

      formData.append(
        'start_time',
        toUTCISO(values.date, values.isWalkIn ? walkInStart : slotStart),
      );
      formData.append(
        'end_time',
        toUTCISO(values.date, values.isWalkIn ? walkInEnd : slotEnd),
      );
      formData.append('doctor_id', String(values.doctorId));
      formData.append('statusId', String(values.statusId));
      formData.append('is_walk_in', String(values.isWalkIn));
      formData.append('allow_overbooking', String(values.allow_overbooking));
      if (values.reason) formData.append('reason', values.reason);
      if (values.notes) formData.append('notes', values.notes);

      if (values.patientMode === 'new') {
        const np = (values.newPatient ?? {}) as NewPatientQuickValues;
        const patientFields: Record<
          string,
          string | File | boolean | number | undefined | null
        > = {
          firstName: np.firstName,
          lastName: np.lastName,
          middleName: np.middleName,
          birthDate: np.birthDate,
          gender: np.gender,
          phone: np.phone,
          address: np.address,
          occupation: np.occupation,
          userId: undefined,
          medicalHistory: np.medicalHistory,
          allergicReactions: np.allergicReactions,
          currentSystemicTreatment: np.currentSystemicTreatment,
          labResults: np.labResults,
          completeOdontogram: np.completeOdontogram,
          hasSncIssues: np.hasSncIssues,
          hasSvcIssues: np.hasSvcIssues,
          hasSeIssues: np.hasSeIssues,
          hasSmeIssues: np.hasSmeIssues,
          hasSrIssues: np.hasSrIssues,
          hasSuIssues: np.hasSuIssues,
          hasSguIssues: np.hasSguIssues,
          hasSgiIssues: np.hasSgiIssues,
          systemEvaluationNotes: np.systemEvaluationNotes,
          profilePicture: np.profilePicture,
        };

        Object.entries(patientFields).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (value !== '' && value != null && value !== false) {
            formData.append(key, String(value));
          } else if (value === false) {
            formData.append(key, 'false');
          }
        });
      } else {
        formData.append('patient_id', String(values.patientId));
      }

      await createAppointment.mutateAsync(formData);
      setOverbookingConflict(false);
      showSuccess('Cita creada', {
        id: toastId,
        description: 'La cita se guardó correctamente.',
      });
      navigate('/appointments');
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      if (err.response?.status === 409 && values.isWalkIn) {
        setOverbookingConflict(true);
        showError('Solapamiento de horario', {
          id: toastId,
          description:
            'El doctor tiene otra cita en ese horario. ¿Desea permitir sobrecupo y reintentar?',
          action: {
            label: 'Permitir sobrecupo y reintentar',
            onClick: () => {
              form.setValue('allow_overbooking', true, {
                shouldValidate: true,
              });
              onSubmit();
            },
          },
        });
      } else {
        showApiError(error, { id: toastId });
      }
    }
  });

  const setWalkIn = (value: boolean) => {
    form.setValue('isWalkIn', value, { shouldValidate: true });
    form.setValue('slot', null);
    form.setValue('allow_overbooking', false);
    const newStatusId = getStatusIdForWalkIn(value);
    form.setValue('statusId', newStatusId, { shouldValidate: true });
    if (value) {
      form.setValue('date', today());
      form.setValue('startTime', currentTime());
    }
  };

  const setPatientMode = (mode: 'search' | 'new') => {
    form.setValue('patientMode', mode, { shouldValidate: true });
    if (mode === 'new') {
      form.setValue('patientId', null);
    } else {
      form.setValue('newPatient', undefined);
    }
  };

  const openPatientModal = () => {
    setPatientModalOpen(true);
    setPatientMode('new');
  };

  const closePatientModal = () => {
    setPatientModalOpen(false);
    setPatientMode('search');
    if (!patientCardData) {
      form.resetField('newPatient');
    }
  };

  const clearPatient = () => {
    setPatientCardData(null);
    form.setValue('patientId', null, { shouldValidate: true });
    form.resetField('newPatient');
    setPatientMode('search');
  };

  const selectExistingPatient = (patient: PatientListItem) => {
    setPatientCardData({
      source: 'existing',
      fullName: patient.fullName,
      phone: String(patient.phone),
      age: patient.age,
      birthday: patient.birthday,
      gender: patient.gender,
      avatarUrl: patient.avatarUrl,
      hasAllergies: patient.hasAllergies,
      completeOdontogram: patient.completeOdontogram,
      occupation: '',
      address: '',
      patientId: patient.id,
    });
    form.setValue('patientId', patient.id, { shouldValidate: true });
    setPatientMode('search');
  };

  const saveNewPatient = async () => {
    if (!(await form.trigger('newPatient'))) return;

    const np = (form.getValues('newPatient') ?? {}) as NewPatientQuickValues;
    const fullName = [np.firstName, np.middleName, np.lastName]
      .filter(Boolean)
      .join(' ');
    const age = np.birthDate
      ? differenceInYears(new Date(), new Date(np.birthDate))
      : undefined;

    setPatientCardData({
      source: 'new',
      fullName,
      phone: np.phone,
      age,
      birthday: np.birthDate,
      gender: np.gender,
      avatarUrl: null,
      hasAllergies: !!np.allergicReactions?.length,
      occupation: np.occupation,
      address: np.address,
      patientId: undefined,
      completeOdontogram: np.completeOdontogram,
    });

    setPatientModalOpen(false);
  };

  const editPatient = () => {
    const data = patientCardData;
    if (!data || data.source !== 'new') return;

    setPatientModalOpen(true);
    setPatientMode('new');
  };

  const selectedDoctor = doctors.data?.data?.find(
    (doctor: DoctorListItem) => doctor.id === doctorId,
  );

  const cardData = useMemo(() => {
    if (!patientCardData) return null;

    if (patientCardData.source === 'new') {
      const np = (newPatient ?? {}) as NewPatientQuickValues;
      return {
        ...patientCardData,
        fullName: [np.firstName, np.middleName, np.lastName]
          .filter(Boolean)
          .join(' '),
        phone: np.phone || '',
        age: np.birthDate
          ? differenceInYears(new Date(), new Date(np.birthDate))
          : undefined,
        birthday: np.birthDate,
        gender: np.gender,
        hasAllergies: !!np.allergicReactions?.length,
        occupation: np.occupation,
        address: np.address,
        avatarUrl: null,
      };
    }

    return patientCardData;
  }, [patientCardData, newPatient]);

  return {
    ...form,
    selectedDoctor,
    doctors,
    errors: form.formState.errors,
    isWalkIn,
    doctorId,
    date: date || today(),
    endTime,
    watchers: {
      slot,
      duration,
      patientId,
      startTime,
      patientMode,
      statusId,
      allowOverbooking,
    },
    slotsQuery,
    isSubmitting:
      form.formState.isSubmitting ||
      createPatient.isPending ||
      createAppointment.isPending,
    onSubmit,
    setWalkIn,
    setPatientMode,
    patientModalOpen,
    openPatientModal,
    closePatientModal,
    saveNewPatient,
    clearPatient,
    selectExistingPatient,
    editPatient,
    patientCardData,
    cardData,
    setPatientId: (id: number) =>
      form.setValue('patientId', id, { shouldValidate: true }),
    overbookingConflict,
  };
}

export default useAppointmentCreate;
