'use no memo';

import { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMinutes, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { usePatientCreateMutation } from '@/modules/patients/hooks/mutations/usePatientCreateMutation';
import {
  showApiError,
  showLoading,
  showSuccess,
} from '@/shared/components/feedback';
import { useAppointmentCreateMutation } from './mutations/useAppointmentCreateMutation';
import {
  AppointmentCreateSchema,
  type AppointmentCreateFormValues,
} from '../schemas/AppointmentCreateSchema';
import {
  AppointmentStatus,
  type AppointmentCreatePayload,
  type PatientCardData,
} from '../types/Appointment';
import { useDoctorSlotsQuery } from '@/modules/doctors/hooks/queries/useDoctorSlotsQuery';
import { useDoctorListQuery } from '@/modules/doctors/hooks/queries/useDoctorListQuery';
import type { DoctorListItem } from '@/modules/doctors/types/Doctor';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import type { GenderType } from '@/modules/patients/enums/GenderType';

const today = () => format(new Date(), 'yyyy-MM-dd');
const currentTime = () => format(new Date(), 'HH:mm:ss');

function useAppointmentCreate() {
  const navigate = useNavigate();
  const createPatient = usePatientCreateMutation();
  const createAppointment = useAppointmentCreateMutation();

  const doctors = useDoctorListQuery({ page: 1, perPage: 100 });
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [patientCardData, setPatientCardData] =
    useState<PatientCardData | null>(null);

  const form = useForm<AppointmentCreateFormValues>({
    resolver: zodResolver(AppointmentCreateSchema),
    defaultValues: {
      isWalkIn: false,
      patientMode: 'search',
      patientId: null,
      newPatient: {
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: undefined,
        phone: '',
        completeOdontogram: true,
        medicalHistory: '',
        hasSncIssues: false,
        hasSvcIssues: false,
        hasSeIssues: false,
        hasSmeIssues: false,
        hasSrIssues: false,
        hasSuIssues: false,
        hasSguIssues: false,
        hasSgiIssues: false,
      },
      doctorId: null,
      date: today(),
      slot: null,
      startTime: currentTime(),
      duration: 30,
      reason: '',
      notes: '',
    },
  });

  const isWalkIn = useWatch({ control: form.control, name: 'isWalkIn' });
  const doctorId = useWatch({ control: form.control, name: 'doctorId' });
  const date = useWatch({ control: form.control, name: 'date' });
  const startTime = useWatch({ control: form.control, name: 'startTime' });
  const duration = useWatch({ control: form.control, name: 'duration' });
  const slotsQuery = useDoctorSlotsQuery(
    !isWalkIn && doctorId && date ? { doctorId, date } : undefined,
  );
  const patientMode = useWatch({
    control: form.control,
    name: 'patientMode',
  });

  const patientId = useWatch({
    control: form.control,
    name: 'patientId',
  });
  const slot = useWatch({ control: form.control, name: 'slot' });

  const endTime = useMemo(() => {
    const [hours, minutes, seconds = '00'] = startTime.split(':').map(Number);
    if ([hours, minutes, Number(seconds)].some(Number.isNaN)) return '';
    const value = new Date();
    value.setHours(hours, minutes, Number(seconds), 0);
    return format(addMinutes(value, duration), 'HH:mm:ss');
  }, [duration, startTime]);

  const onSubmit = form.handleSubmit(async (values) => {
    const toastId = showLoading('Guardando cita…', {
      description: values.isWalkIn
        ? 'Registrando atención walk-in'
        : 'Agendando consulta',
    });

    try {
      let patientId = values.patientId;
      if (values.patientMode === 'new') {
        const patientFormData = new FormData();
        for (const [key, value] of Object.entries(values.newPatient)) {
          if (value !== '' && value != null)
            patientFormData.append(key, String(value));
        }
        const patient = await createPatient.mutateAsync(patientFormData);
        patientId = patient.id;
      }

      if (patientId == null || values.doctorId == null) {
        throw new Error('Faltan datos obligatorios para crear la cita.');
      }

      const selectedSlot = values.slot;
      const start = values.isWalkIn
        ? `${values.date}T${values.startTime}`
        : `${values.date}T${selectedSlot?.startTime ?? ''}`;
      const end = values.isWalkIn
        ? `${values.date}T${endTime}`
        : `${values.date}T${selectedSlot?.endTime ?? ''}`;
      const payload: AppointmentCreatePayload = {
        patient_id: patientId,
        doctor_id: values.doctorId,
        start_time: new Date(start).toISOString(),
        end_time: new Date(end).toISOString(),
        status: values.isWalkIn
          ? AppointmentStatus.WAITING
          : AppointmentStatus.SCHEDULED,
        is_walk_in: values.isWalkIn,
        reason: values.reason,
        ...(values.notes ? { notes: values.notes } : {}),
      };

      await createAppointment.mutateAsync(payload);
      showSuccess('Cita creada', {
        id: toastId,
        description: 'La cita se guardó correctamente.',
      });
      navigate('/appointments/new');
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  });

  const setWalkIn = (value: boolean) => {
    form.setValue('isWalkIn', value, { shouldValidate: true });
    form.setValue('slot', null);
    if (value) {
      form.setValue('date', today());
      form.setValue('startTime', currentTime());
    }
  };

  const setPatientMode = (mode: 'search' | 'new') => {
    form.setValue('patientMode', mode, { shouldValidate: true });
    if (mode === 'new') form.setValue('patientId', null);
  };

  const openPatientModal = () => {
    setPatientModalOpen(true);
    setPatientMode('new');
  };

  const closePatientModal = () => {
    setPatientModalOpen(false);
    setPatientMode('search');
    form.resetField('newPatient');
  };

  const clearPatient = () => {
    setPatientCardData(null);
    form.setValue('patientId', null, { shouldValidate: true });
    form.resetField('newPatient');
    setPatientMode('search');
  };

  const selectExistingPatient = (patient: PatientListItem) => {
    const genderMap: Record<string, GenderType> = {
      M: 'male',
      F: 'female',
    };

    setPatientCardData({
      source: 'existing',
      fullName: patient.fullName,
      phone: String(patient.phone),
      age: patient.age,
      birthday: patient.birthday,
      gender: (genderMap[patient.gender] ?? 'other') as GenderType,
      avatarUrl: patient.avatarUrl,
      hasAllergies: patient.hasAllergies,
      patientId: patient.id,
    });
    form.setValue('patientId', patient.id, { shouldValidate: true });
    setPatientMode('search');
  };

  const saveNewPatient = async () => {
    if (!(await form.trigger('newPatient'))) return;

    const newPatientData = form.getValues('newPatient');
    const fullName =
      `${newPatientData.firstName} ${newPatientData.lastName}`.trim();
    const age = newPatientData.birthDate
      ? new Date().getFullYear() -
        new Date(newPatientData.birthDate).getFullYear()
      : undefined;

    const genderMap: Record<string, GenderType> = {
      M: 'male',
      F: 'female',
    };

    setPatientCardData({
      source: 'new',
      fullName,
      phone: newPatientData.phone,
      age,
      birthday: newPatientData.birthDate,
      gender: (genderMap[newPatientData.gender as string] ??
        'other') as GenderType,
      avatarUrl: null,
      hasAllergies: false,
    });

    setPatientModalOpen(false);
    setPatientMode('search');
  };

  const selectedDoctor = doctors.data?.data?.find(
    (doctor: DoctorListItem) => doctor.id === doctorId,
  );

  return {
    ...form,
    selectedDoctor,
    errors: form.formState.errors,
    isWalkIn,
    doctorId,
    date: date || format(new Date(), 'yyyy-MM-dd'),
    endTime,
    watchers: {
      slot,
      duration,
      patientId,
      startTime,
      patientMode,
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
    patientCardData,
    setPatientId: (id: number) =>
      form.setValue('patientId', id, { shouldValidate: true }),
  };
}

export default useAppointmentCreate;
