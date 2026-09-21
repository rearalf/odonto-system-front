'use no memo';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO, subYears } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  PatientCreateSchema,
  type PatientCreateFormValues,
} from '@/modules/patients/schemas/PatientCreateSchema';
import {
  SISTEMAS_ANATOMICOS,
  type PatientSystemDtoKey,
} from '@/modules/patients/constants/SistemasAnatomicos';
import { calculateAge } from '@/shared/utils/date';
import { patientApi } from '@/modules/patients/api/patientApi';
import type { PatientDetail } from '@/modules/patients/types/PatientList';
import {
  showApiError,
  showLoading,
  showSuccess,
} from '@/shared/components/feedback';

function toFormValues(detail: PatientDetail): PatientCreateFormValues {
  const hasSystemIssues = Object.fromEntries(
    SISTEMAS_ANATOMICOS.map((s) => [
      s.dtoKey,
      Boolean(detail.systemicReview[s.dtoKey]),
    ]),
  ) as Record<PatientSystemDtoKey, boolean>;

  return {
    profilePicture: null,
    firstName: detail.person.firstName ?? '',
    middleName: detail.person.middleName ?? '',
    lastName: detail.person.lastName ?? '',
    birthDate: format(parseISO(detail.birthDate), 'yyyy-MM-dd'),
    gender: detail.gender,
    phone: detail.person.phone ?? '',
    occupation: detail.person.occupation ?? '',
    address: detail.person.address ?? '',
    medicalHistory: detail.medicalHistory ?? '',
    allergicReactions: detail.allergicReactions ?? '',
    currentSystemicTreatment: detail.currentSystemicTreatment ?? '',
    labResults: detail.labResults ?? '',
    systemEvaluationNotes: detail.systemicReview.systemEvaluationNotes ?? '',
    completeOdontogram: Boolean(detail.completeOdontogram),
    ...hasSystemIssues,
  };
}

export function usePatientEdit() {
  const { id } = useParams<{ id: string }>();
  const maxBirthDate = format(subYears(new Date(), 1), 'yyyy-MM-dd');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isError, error } = useQuery({
    queryKey: ['patients', id],
    queryFn: () => patientApi.get(id as string),
    enabled: Boolean(id),
    retry: false,
  });

  const form = useForm<PatientCreateFormValues>({
    resolver: zodResolver(PatientCreateSchema),
    defaultValues: {
      profilePicture: null,
      middleName: '',
      occupation: '',
      address: '',
      medicalHistory: '',
      allergicReactions: '',
      currentSystemicTreatment: '',
      labResults: '',
      systemEvaluationNotes: '',
      birthDate: maxBirthDate,
      phone: '',
      gender: undefined,
      completeOdontogram: true,
      hasSncIssues: false,
      hasSvcIssues: false,
      hasSeIssues: false,
      hasSmeIssues: false,
      hasSrIssues: false,
      hasSuIssues: false,
      hasSguIssues: false,
      hasSgiIssues: false,
    },
  });

  const { register, control, setValue, getValues, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (data) form.reset(toFormValues(data));
  }, [data, form]);

  useEffect(() => {
    if (isError) showApiError(error);
  }, [isError, error]);

  const birthDate = useWatch({ control, name: 'birthDate' });
  const completeOdontogram = useWatch({ control, name: 'completeOdontogram' });
  const foto = useWatch({ control, name: 'profilePicture' });

  const sistemaChecked: Record<PatientSystemDtoKey, boolean> = {
    hasSncIssues: useWatch({ control, name: 'hasSncIssues' }),
    hasSvcIssues: useWatch({ control, name: 'hasSvcIssues' }),
    hasSeIssues: useWatch({ control, name: 'hasSeIssues' }),
    hasSmeIssues: useWatch({ control, name: 'hasSmeIssues' }),
    hasSrIssues: useWatch({ control, name: 'hasSrIssues' }),
    hasSuIssues: useWatch({ control, name: 'hasSuIssues' }),
    hasSguIssues: useWatch({ control, name: 'hasSguIssues' }),
    hasSgiIssues: useWatch({ control, name: 'hasSgiIssues' }),
  };

  const sistemas = SISTEMAS_ANATOMICOS.map((sistema) => ({
    ...sistema,
    checked: sistemaChecked[sistema.dtoKey],
    toggle: () => toggleSistema(sistema.dtoKey),
  }));

  const age = calculateAge(birthDate);

  const setBirthDate = (value: string) => setValue('birthDate', value);
  const setCompleteOdontogram = (checked: boolean) =>
    setValue('completeOdontogram', checked);
  const setFoto = (file: File | null) =>
    setValue('profilePicture', file, { shouldValidate: true });
  const toggleSistema = (dtoKey: PatientSystemDtoKey) =>
    setValue(dtoKey, !getValues(dtoKey));

  const onSubmit = form.handleSubmit(async (data) => {
    if (!id) {
      navigate('/patients');
      return;
    }
    if (!data) return;
    const formData = new FormData();
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture);
    }
    for (const [key, value] of Object.entries(data)) {
      if (key === 'profilePicture' || value === '' || value == null) continue;
      formData.append(key, String(value));
    }
    const toastId = showLoading('Guardando cambios…', {
      description: 'Actualizando el expediente clínico',
    });
    try {
      await patientApi.update(id, formData);
      showSuccess('Paciente actualizado', {
        id: toastId,
        description: 'Los cambios se guardaron correctamente',
      });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      navigate(`/patients/${id}`);
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  });

  const handleCancel = () => {
    navigate('/patients');
  };

  const patientName = data
    ? `${data.person.firstName} ${data.person.lastName}`.trim()
    : undefined;

  return {
    register,
    control,
    errors,
    isSubmitting: formState.isSubmitting,
    patientName,
    onSubmit,
    setBirthDate,
    setCompleteOdontogram,
    handleCancel,
    setFoto,
    sistemas,
    birthDate,
    completeOdontogram,
    foto,
    age,
    maxBirthDate,
  };
}